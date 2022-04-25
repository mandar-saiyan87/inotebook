import React, { createContext, useState } from "react";

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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODRmYzIxNDVjNGY5Njg1MDBkZTkxIn0sImlhdCI6MTY1MDgwNTMzNn0.BJgvUkXup1qqxD2wu_N1unXMzE0sTlcCO5hOa4HQspY"
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  // Add Note
  async function addNote(title, description, tag) {
    // TODO: Call an API to add note
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODRmYzIxNDVjNGY5Njg1MDBkZTkxIn0sImlhdCI6MTY1MDgwNTMzNn0.BJgvUkXup1qqxD2wu_N1unXMzE0sTlcCO5hOa4HQspY"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    const note = {
      "_id": "625d591ac3286350b96d1578",
      "user": "62584fc2145c4f968500de91",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-04-18T12:27:06.157Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  // Edit Note
  async function editNote(id, title, description, tag) {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODRmYzIxNDVjNGY5Njg1MDBkZTkxIn0sImlhdCI6MTY1MDgwNDY3NX0.0WsWwtdkD8TXhjngQCoGul0y4AY1yVP28VDBlqXEiHE"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Edit note
    notes.forEach((elem) => {
      if (elem._id === id) {
        elem.title = title;
        elem.description = description;
        elem.tag = tag;
      }
    })
  }

  // Delete Note
  function deleteNote(id) {
    // TODO: Call an API to delete note
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );

}

export default NoteState;
export { NoteContext };