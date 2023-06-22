import React, { useState } from 'react';

const NoteForm = ({ onSubmit }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(note);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Agregar nota..."
      ></textarea>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default NoteForm;
