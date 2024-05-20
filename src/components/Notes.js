import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Spinner from './Spinner';
import NoteItem from "./NoteItem.js";
import AddNote from "./AddNote.js";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote, editNote,loading } = context;
  const {showAlert} = props
  let navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    }
    else{
    navigate("/login")
   }
    
    //eslint-disable-next-line
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      etag: currentNote.tag,
      edescription: currentNote.description,
    });
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated!!!", "success");

    // addNote(note.title,note.description,note.tag)
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        hidden
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name="etag"
                    value={note.etag}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  {/* <input
            type="password"
            className="form-control"
            id="description"
          /> */}
                  <textarea
                    name="edescription"
                    className="form-control"
                    id="description"
                    cols="25"
                    rows="6"
                    type="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2>Your Notes!</h2>
        <div className="container mx-3">
          {notes.length === 0 && "No Notes to display"}
        </div>
        {loading && <Spinner />}
        {notes.map((note) => {
          return (
            <NoteItem showAlert={showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
