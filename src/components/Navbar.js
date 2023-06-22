import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">GAFEEK</div>
      <button className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
        <li className="nav-item">
          <a className="nav-link" href="#home">
            Inicio
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">
            Acerca de
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#services">
            Servicios
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact">
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
