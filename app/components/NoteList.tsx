import styles from "./NoteList.css";

export const links = () => [
    {
            rel:"stylesheet",
            href:styles
    }

    ];

// @ts-ignore
export default function NoteList({notes}){
    return (
        <ul id="note-list">
            {
                notes.map((note:any, index:any) => (
                    <li key={note.id} className="note">
                        <article>
                            <header>
                                <ul className="note-meta">
                                    <li>
                                        #{index + 1}
                                    </li>
                                    <li>
                                        <time dateTime={note.id}>
                                            {
                                                new Date(note.id).toLocaleDateString('en-US',{
                                                    day:'numeric',
                                                    month:'short',
                                                    year:'numeric',
                                                    hour:'2-digit',
                                                    minute:'2-digit'
                                                })
                                            }
                                        </time>
                                    </li>
                                </ul>
                                <h2>{note.title}</h2>
                            </header>
                            <p>{note.content}</p>
                        </article>
                    </li>

                ))
            }
        </ul>
    )
}