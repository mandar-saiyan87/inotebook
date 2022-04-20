import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <h3>Your Notes</h3>
          {notes.map((note) => {
            return <NoteItem note={note} />
          })}
        </div>
      </div>

    </>

  );
}

export default Notes;
