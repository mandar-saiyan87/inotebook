import React, { useContext, useState } from 'react';
import { NoteContext } from '../context/notes/NoteContext';

function AddNote() {

  const context = useContext(NoteContext);
  const { addNote, showAlert } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });


  function handleSubmit(e) {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
    setNote({
      title: "",
      description: "",
      tag: ""
    })
    showAlert("New note added successfully", "success")
  }

  function handleChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container my-4">
        <h3>Add Note</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" placeholder='Enter Title' onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" value={note.description} name='description' rows="3" placeholder='Enter Description' onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" value={note.tag} name='tag' placeholder="Enter Tag " onChange={handleChange} />
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default AddNote;
