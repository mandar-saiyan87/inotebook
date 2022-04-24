import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteContext';

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <>
      <div className="col-md-4" >
        <div className="card my-3">
          <div className="card-header">
            {note.tag}
          </div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-pen-to-square fa-lg mx-2" style={{ cursor: "pointer" }}></i>
            <i className="fa-solid fa-trash-can fa-lg mx-2" style={{ cursor: "pointer" }} onClick={() => { deleteNote(note._id) }}></i>
          </div>
        </div>
      </div>

    </>
  );
}

export default NoteItem;
