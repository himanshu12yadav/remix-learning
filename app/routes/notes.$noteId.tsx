import {Link} from '@remix-run/react';

import styles from '../styles/note-details.css?url';

export default function NoteDetailsPage(){

    return (
        <main id="note-details">
            <header>
                <nav>
                    <Link to="/notes">Back to all Notes</Link>
                </nav>
                <h1>Note Title</h1>
            </header>
            <p id="note-details-content">
                Note Content
            </p>
        </main>
    )
}


export const links = ()=> [
            {
                rel:"stylesheet",
                href:styles
            }
        ];
