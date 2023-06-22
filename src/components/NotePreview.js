import React from 'react';

const NotePreview = ({ note }) => {
  return (
    <div className="note-preview">
      <img src={note.image} alt="Note Icon" />
      <p>{note.text}</p>
    </div>
  );
};

export default NotePreview;
