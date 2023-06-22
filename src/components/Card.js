// Card.js
import React from 'react';

const Card = ({ title, onTitleClick, children }) => {
  return (
    <div className="card">
      <div className="card-header" onClick={onTitleClick}>
        {title}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
