import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notebar-be.onrender.com";
  const notesInitial = [];
  //Get All Notes
  const getNote = async () => {
    //todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  const [notes, setNotes] = useState(notesInitial);

  //ADD a Note
  const addNote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));

    // console.log(json);

    // console.log("Adding a new note");
    // {
    //   _id: "65f9380d1b0e770ea6bf6d91saag",
    //   user: "65f7312306ebd62c41b8445f",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-03-19T07:00:29.085Z",
    //   __v: 0,
    // };
  };
  //Delete Note
  const deleteNote = async (id) => {
    //API call

    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("Deleting note" +id)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //View Note
  const viewNote = () => {};
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, viewNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
