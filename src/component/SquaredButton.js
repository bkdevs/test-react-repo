import React from 'react';
import './SquaredButton.css';

const SquaredButton = ({ children, onClick, style, ...props }) => {
  return (
    <button
      className="squared-button"
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default SquaredButton;
