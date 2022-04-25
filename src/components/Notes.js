import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes()
  }, []);
  return (
    <>
      <AddNote />
      <div className="container">
        <div className="row my-5">
          <h3>Your Notes</h3>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />
          })}
        </div>
      </div>

    </>

  );
}

export default Notes;
