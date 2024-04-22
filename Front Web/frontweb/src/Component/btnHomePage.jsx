

import React from 'react';
import { Link } from 'react-router-dom';

const BtnHomePage = () => {
  return (
    // <Link to="/" style={linkStyle}>
      <button style={buttonStyle}>Home</button>
    // </Link>
  );
}

// const linkStyle = {
//   textDecoration: 'none',
// }

const buttonStyle = {
  background: '#FFFFFF',
  fontWeight: 'bold',
  color: '#1F1BD5',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
  width: "100%"
}


export default BtnHomePage;