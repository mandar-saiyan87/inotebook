import React from 'react';

function NoteItem(props) {

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
            <i className="fa-solid fa-pen-to-square fa-lg mx-2"></i>
            <i className="fa-solid fa-trash-can fa-lg mx-2"></i>
          </div>
        </div>
      </div>

    </>
  );
}

export default NoteItem;
