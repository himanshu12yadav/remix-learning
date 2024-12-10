import NewNote, {links as newNotes} from '../components/NewNotes';
import {json, LinksFunction, redirect} from "@remix-run/node";
import {getStoredNotes, storeNotes} from "~/data/notes";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import {Link, useLoaderData, useRouteError} from "@remix-run/react";
import {isRouteErrorResponse} from "@remix-run/router/utils";

export const loader = async ()=>{
    const notes = await getStoredNotes();

    return notes;
    // return new Response(JSON.stringify(notes), {headers:{"Content-Type":'application/json'}}); alternative
    // return json(notes); // alternative or short form of Response or behind the scene
}


// @ts-ignore
export const action = async({request})=>{
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    if (noteData.title.trim().length < 5){
        return {message: "Invalid title"}
    }
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
}

export default function Notes() {
    const notes = useLoaderData();

    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}


export function ErrorBoundary({error}){
    const caughtResponse = useRouteError()

    if (isRouteErrorResponse(caughtResponse)){

        return (
            <div>
                <h1>{caughtResponse.status}{caughtResponse.statusText}</h1>
                <p>{caughtResponse.data}</p>
            </div>
        )
    }

    return (
        <main className="error">
            <h1>An error occured related to notes.</h1>
            <p>{error}</p>
            <p>
                Back to <Link to="/">Back to safety</Link>
            </p>
        </main>
    )
}

export const links:LinksFunction = ()=>[
  ...newNotes(),
    ...noteListLinks()
]
