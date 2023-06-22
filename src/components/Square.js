import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

const Square = ({ squareStyle, onClick, time, note, onNoteChange, onAddNote }) => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleNoteIconClick = () => {
    setShowNoteForm(true);
  };

  const handleNoteSubmit = () => {
    setShowNoteForm(false);
    onAddNote(newNote);
    setNewNote('');
  };

  return (
    <div className="square" style={squareStyle} onClick={onClick}>
      {time}
      {note && (
        <div className="note-icon" onClick={handleNoteIconClick}>
          <FiPlusCircle />
        </div>
      )}
      {showNoteForm && (
        <div className="note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Agregar nota..."
          ></textarea>
          <button onClick={handleNoteSubmit}>Agregar</button>
        </div>
      )}
    </div>
  );
};

export default Square;
