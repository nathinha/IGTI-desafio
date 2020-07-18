import React from 'react';

const Button = ({ clickFunction, children }) => {
  const handleClick = () => {
    clickFunction();
  }

  return (
    <button
      onClick={handleClick}
      className="waves-effect waves-light btn"
    >
      {children}
    </button>
  )
}

export default Button;
