import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo"><h2>Maxlence</h2></Link>
      <h1 className="navbar-heading">Users-Panel</h1>
      <div className="navbar-avatar" onClick={toggleDropdown}>
        <AccountCircle />
      </div>
      <Link to="/" className="logout-button">LogOut</Link>
      {isOpen && (
        <div className="dropdown active">
          <div className="dropdown-content">
            <span>User name</span>
            <br></br>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
