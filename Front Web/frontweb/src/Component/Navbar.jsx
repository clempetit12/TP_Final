import React from 'react';
import BtnAdd from './BtnAdd';
import BtnHomePage from './btnHomePage';

const Navbar = () => {
  return (
    <nav style={navbarStyle}> 
    <img src="./clockIcon.png" alt="" style={imgStyle} />
      <div style={navListStyle}>
        <div style={btnHomeStyle}>
          <BtnHomePage></BtnHomePage>
        </div>
        <div style={btnAddStyle}>
          <BtnAdd></BtnAdd>
        </div>
      </div>
    </nav>
  );
}

const imgStyle = {
  height: "143px",
  width: "143px",
  marginBottom: "100px",
  marginTop: '25px',
  
}

const navbarStyle = {
  width: '15%',
  height: '100vh',
  background: '#1F1BD5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const navListStyle = {
  marginTop: '25px',
  width: "90%"
}

const btnHomeStyle = {
  marginBottom: '20%',
}

const btnAddStyle = {
}

export default Navbar;