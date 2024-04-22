import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header style={headerStyle}>
            <div style={headerContentStyle}>
                <div style={searchContainerStyle}>
                    <div style={searchIconStyle}>
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input type="text" placeholder="Search Employee" style={searchInputStyle} />

                </div>
                <nav>
                    <ul style={navStyle}>
                        <li style={listItemStyle}><a href="/logout" style={{ ...linkStyle, ...hoverStyle }}>Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

const headerStyle = {
    background: '#1F1BD5',
    color: '#fff',
    padding: '10px',
}

const headerContentStyle = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
}

const searchContainerStyle = {
    position: 'relative',
}

const searchInputStyle = {
    padding: '8px 30px 8px 10px',
    width: '345px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    background: '#D9D9D9'
}

const searchIconStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: 'black',
}

const navStyle = {
    listStyle: 'none',
    marginLeft: '10px',
    marginTop: '13px',
}

const listItemStyle = {
    display: 'inline-block',
    marginLeft: '20px',
}

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    transition: 'color 0.3s', 
    marginRight: '8px',
  }
  
  const hoverStyle = {
    color: '#FFFFFF',
  }
  
 

export default Header;