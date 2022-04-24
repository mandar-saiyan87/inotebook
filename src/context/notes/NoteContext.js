import React, { createContext, useState } from "react";

const NoteContext = createContext();

function NoteState(props) {
  const noteInitial = [
    {
      "_id": "625a978197b6228e4632da78",
      "user": "62584fc2145c4f968500de91",
      "title": "Test note",
      "description": "Test note to check add new note api endpoint",
      "tag": "Personal",
      "date": "2022-04-16T10:16:33.894Z",
      "__v": 0
    },
    {
      "_id": "625a979897b6228e4632da7a",
      "user": "62584fc2145c4f968500de91",
      "title": "Test note new to delete",
      "description": "Test note to check add new note api endpoint new to delete",
      "tag": "Personal",
      "date": "2022-04-16T10:16:56.478Z",
      "__v": 0
    },
    {
      "_id": "625d58d2c3286350b96d137f",
      "user": "62584fc2145c4f968500de91",
      "title": "Workout",
      "description": "Go to gym, mix workout",
      "tag": "Personal",
      "date": "2022-04-18T12:25:54.199Z",
      "__v": 0
    },
    {
      "_id": "625d591ac3286350b96d1381",
      "user": "62584fc2145c4f968500de91",
      "title": "React js Tutorial",
      "description": "Complete few more videos of Code with Harry React js tutorial.",
      "tag": "Personal",
      "date": "2022-04-18T12:27:06.157Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(noteInitial);

  // Add Note
  function addNote(title, description, tag) {
    console.log("Adding a new note");
    // TODO: Call an API to add note
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
  function editNote() {

  }
  // Delete Note
  function deleteNote(id) {
    console.log("Deleting the note" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );

}

export default NoteState;
export { NoteContext };