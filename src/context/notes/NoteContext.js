import React, { createContext, useState } from "react";
// import Alert from "../../components/Alert";

const NoteContext = createContext();

function NoteState(props) {
  const host = 'http://localhost:5000'
  const noteInitial = []

  const [notes, setNotes] = useState(noteInitial);

  // Get Notes
  async function getNotes() {
    // TODO: Call an API to add note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  // Add Note
  async function addNote(title, description, tag) {
    // API call to add note
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    console.log(note);

    // const note = {
    //   "_id": "625d591ac3286350b10d1578",
    //   "user": "62584fc2145c4f968500de91",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-04-18T12:27:06.157Z",
    //   "__v": 0
    // }
  }

  // Edit Note
  async function editNote(id, title, description, tag) {
    // API Call to edit note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODRmYzIxNDVjNGY5Njg1MDBkZTkxIn0sImlhdCI6MTY1MDgwNDY3NX0.0WsWwtdkD8TXhjngQCoGul0y4AY1yVP28VDBlqXEiHE"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    // Edit note logic

    const editedNote = notes.map((elem) => {
      if (elem._id === id) {
        return {
          ...elem,
          title: title,
          description: description,
          tag: tag
        }
      }
      return elem
    }
    )
    setNotes(editedNote);

  }

  // Delete Note
  async function deleteNote(id) {
    // API call to delete note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODRmYzIxNDVjNGY5Njg1MDBkZTkxIn0sImlhdCI6MTY1MDgwNDY3NX0.0WsWwtdkD8TXhjngQCoGul0y4AY1yVP28VDBlqXEiHE"
      },
    });
    const json = await response.json();
    console.log(json);

    const deleteNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(deleteNote)
  }

  const [alert, setAlert] = useState(null);
  function showAlert(message, type) {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes, alert, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  );

}

export default NoteState;
export { NoteContext };