import NewNote, {links as newNotes} from '../components/NewNotes';
import {LinksFunction, redirect} from "@remix-run/node";
import {getStoredNotes, storeNotes} from "~/data/notes";
import NoteList, {links as noteListLinks} from "~/components/NoteList";

export const loader = async ()=>{
    const notes = await getStoredNotes();

}


// @ts-ignore
export const action = async({request})=>{
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
}

export default function Notes() {
    return (
        <main>
            <NewNote />
            <NoteList notes={[]}/>
        </main>
    )
}

export const links:LinksFunction = ()=>[
  ...newNotes(),
    ...noteListLinks()
]
