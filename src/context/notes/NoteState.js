import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notebar-be.onrender.com";
  const notesInitial = [];
   //Get All Notes
  const [loading, setLoading] = useState(false);
  const getNote = async () => {
    //todo api call
    setLoading(true);
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
    setLoading(false);
  };

  const [notes, setNotes] = useState(notesInitial);

  //ADD a Note
  const addNote = async (title, description, tag) => {
    //todo api call
    setLoading(true);
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
    setLoading(false);
  };
  //Delete Note
  const deleteNote = async (id) => {
    //API call
    setLoading(true);
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
    setLoading(false);
  };
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call
    setLoading(true);
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
    setLoading(false);
  };

  //View Note
  const viewNote = () => {};
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, viewNote, getNote,loading }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
