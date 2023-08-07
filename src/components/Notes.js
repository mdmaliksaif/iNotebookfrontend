import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  const [loading, setLoading] = useState(true); // State to handle loading state

  // Create a state variable to keep track of showing all notes or just top three
  const [showAllNotes, setShowAllNotes] = useState(false);

  // Get the top three notes when showAllNotes is false, otherwise get all notes
  // const displayedNotes = showAllNotes ? notes : notes.slice(0, 3);
  const displayedNotes = showAllNotes ? notes.slice().reverse() : notes.slice(-3).reverse();


  const scrollToTop = () => {
    window.scrollTo({ top: 70, behavior: "smooth" });
  };

  const handleShowTopThree = () => {
    setShowAllNotes(false); // Set showAllNotes to false when going back to top three notes
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes()
        .then(() => setLoading(false)) // Set loading to false once data is fetched
        .catch((error) => {
          setLoading(false); // Set loading to false if there's an error
          console.error("Error fetching notes:", error);
        });
    } else {
      setLoading(false); // Set loading to false if no token is available
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    if (note.etitle.trim() === "") {
      props.showAlert("Title can't be empty", "danger");
      return;
    }
    if (note.edescription.trim() === "") {
      props.showAlert("Description can't be empty", "danger");
      return;
    }

    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
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
      <div className="container">
        <AddNote showAlert={props.showAlert} />
      </div>
      <div className="container ">
        <h2 style={{ color: "#000000" }}>Your Notes</h2>
        <div className="container text-dark row">
          {loading && "Loading..."}
          {notes.length === 0 && (
            <h4 style={{ color: "#000000" }}>
              "You haven't any notes to display. Make a new one."
            </h4>
          )}
          {!loading &&
            Array.isArray(displayedNotes) &&
            displayedNotes.map((note) => {
              return (
                <Noteitem
                  key={note._id}
                  updateNote={updateNote}
                  showAlert={props.showAlert}
                  note={note}
                />
              );
            })}
        </div>
        {!showAllNotes && notes.length > 3 && (
          <div className="container">
            <i
              class="fa-solid fa-arrow-down "
              onClick={() => setShowAllNotes(true)}
              style={{ fontSize: "50px", cursor: "pointer" }}
            ></i>
          </div>
        )}

        {/* {!loading && Array.isArray(notes) && notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })} */}
        {showAllNotes && (
  <button
    className="btn btn-info"
    onClick={handleShowTopThree}
  >
    Top Notes
  </button>
)}

      </div>
      <div className="container">
        <i
          style={{ display: "block", margin: "20px auto", fontSize: "50px" }}
          class="fa-solid fa-scroll"
          onClick={scrollToTop}
        ></i>
      </div>
    </>
  );
};

export default Notes;
