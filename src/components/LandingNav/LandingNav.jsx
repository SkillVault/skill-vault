import React from "react";
import { Link } from "react-router-dom";
import "./LandingNav.css";

const LandingNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/src/assets/logo.png" alt="Logo" className="logo" />
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contactpage" className="nav-link">
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/candidate/login" className="nav-link">
            Candidate Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/company/login" className="nav-link">
            Company Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LandingNavbar;
