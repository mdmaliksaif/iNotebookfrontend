import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const DetailsNotes = (props) => {
  const { singlenote, deleteNote, editNote } = useContext(noteContext);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: singlenote._id,
    etitle: singlenote.title,
    edescription: singlenote.description,
    etag: singlenote.tag,
  });

  useEffect(() => {
    // Synchronize the local state with the context prop whenever singlenote changes
    setNote({
      id: singlenote._id,
      etitle: singlenote.title,
      edescription: singlenote.description,
      etag: singlenote.tag,
    });
  }, [singlenote]); // The effect will run whenever singlenote changes

  const updateNote = () => {
    ref.current.click();
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
          <div
            className="modal-content"
            style={{ backgroundColor: "#202326", color: "#fff" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <form className="my-3 ">
                <div className="mb-3">
                  <label htmlFor="title" className=" font-weight form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="dark-wide-border form-control text-light"
                    style={{ backgroundColor: "#202326" }}
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className=" font-weight form-label"
                  >
                    Description
                  </label>
                  <textarea
                    className="dark-wide-border form-control text-light"
                    rows="5"
                    style={{ backgroundColor: "#202326" }}
                    id="edescription"
                    name="edescription"
                    placeholder="Your notes"
                    minLength={5}
                    required
                    onChange={onChange}
                    value={note.edescription}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="font-weight form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="dark-wide-border form-control text-light"
                    id="etag"
                    style={{ backgroundColor: "#202326" }}
                    value={note.etag}
                    name="etag"
                    onChange={onChange}
                  />
                  <span class="custom-placeholder">
                    <i>(Optional)</i>
                  </span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn custom-button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary custom-button"
                onClick={handleClick}
                type="button"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* disable = (notes.length === 0)?true:false */}
      <div className="container mt-3"></div>
      <Link to="/main" className="btn btn-primary">
        Back
      </Link>
      <div className="d-flex justify-content-center my-4">
        <div
          className="card my-3 dark-wide-border text-light"
          style={{ backgroundColor: "#343a40" }}
        >
          
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h4 className="card-title" style={{ color: "#97FEED" }}>
                {note.etitle}
              </h4>
              <div className="d-flex">
                <i
                  className="fa-solid fa-trash-can mx-2"
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square mx-2"
                  onClick={updateNote}
                ></i>

                {/* <Link to="/detailsnotes"><i class="fa-solid fa-book-open-reader  mx-3" onClick={()=>{getNoteDetails(note._id)}}></i></Link> */}
              </div>
            </div>
            <p className="card-text">{note.edescription}</p>
            <h6 className="card-text text-info">{note.etag}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsNotes;
<button className="btn btn-primary">Back</button>