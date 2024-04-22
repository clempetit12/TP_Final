import React from 'react';
import { Link } from 'react-router-dom'; 

const BtnAdd = () => {
  return (
    // <Link to="/">
      <button style={buttonStyle}>Add Employee</button>
    /* </Link> */
  );
}

const buttonStyle = {
  background: '#FFFFFF',
  fontWeight: 'bold',
  color: '#1F1BD5',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  width: "100%",
  transition: 'background-color 0.3s, color 0.3s', // Transition fluide
}

// Style de survol
const buttonHoverStyle = {
  background: '#1F1BD5',
  color: '#FFFFFF',
}

export default BtnAdd;