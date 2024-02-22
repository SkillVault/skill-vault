import React from "react";
import "./LandingNav.css";

const LandingNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="./src/assets/logo.png" alt="Logo" className="logo" />
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="/contactpage" className="nav-link">
            Contact
          </a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link">
            Login/Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
