import React, { useContext, useEffect, useRef, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote, showAlert } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/login')
    }

    // eslint-disable-next-line
  }, []);

  function updateNote(currentnote) {
    ref.current.click()
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag
    })
  }

  function handleSubmit(e) {
    console.log("Updated Note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    showAlert("Updated Successfully", "success")

  }

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote />


      <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name='etitle' value={note.etitle} aria-describedby="emailHelp" placeholder='Enter Title' onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" name='edescription' value={note.edescription} rows="3" placeholder='Enter Description' onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='etag' value={note.etag} onChange={handleChange} placeholder="Enter Tag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row my-5">
          <h3>Your Notes</h3>
          <div className="container mx-2">
            {notes.length === 0 && "No notes to display"}
          </div>

          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>

    </>

  );
}

export default Notes;
