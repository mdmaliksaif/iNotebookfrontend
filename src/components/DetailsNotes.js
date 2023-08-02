import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const DetailsNotes = () => {
  const { singlenote } = useContext(NoteContext);

  // Assuming your note has 'title', 'description', and 'tag' properties
  const { title, description, tag } = singlenote;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#ADD8E6',
      }}
    >
      <div class="card" style={{ width: '30rem' , height:'30rem'}}>
        <div class="card-body">
          <h2 class="card-title">Title : {title}</h2>
          <p class="card-text">Desc : {description}</p>
          <h3 class="card-subtitle mb-2 text-muted">{tag}</h3>
        </div>
      </div>
    </div>
  );
};

export default DetailsNotes;
