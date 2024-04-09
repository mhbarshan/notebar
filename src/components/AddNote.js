import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.js";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:"", description:"", tag:""})
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    props.showAlert("Note Added!!!", "success");

    setNote({title:"", description:"", tag:""})
  };
  const onChange = (e) => {
    setNote({...note,[e.target.name]: e.target.value})
  };
  return (
    <div className="container my-3">
      <h1 style={{color:'teal',textAlign:'center'}}>Add Note!</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title"  className="form-label">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            minLength={3}
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag"  className="form-label">
            <strong>Tag</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            onChange={onChange}
            name="tag"
            value={note.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <strong>Description</strong>
          </label>
          {/* <input
            type="password"
            className="form-control"
            id="description"
          /> */}
          <textarea
            name="description"
            className="form-control"
            id="description"
            cols="30"
            rows="10"
            type="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <button type="submit" disabled={note.title.length<3 || note.description.length<5}  onClick={handleClick} className="btn btn-primary loginBtn">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
