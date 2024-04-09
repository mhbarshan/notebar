import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext.js";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-sharp fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note Deleted!!!", "info");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          {/* <Link to="#" className="btn btn-primary">
            Go somewhere
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
