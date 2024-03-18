import React from 'react'
import "./CompanyDashboard.css";

import { googleLogout } from '@react-oauth/google';
import { Link } from "react-router-dom";

const CompanyDashboard = () => {

  return (
    <nav className="cdashboard">
      <ul className="cdashboard-links">
        <li className="cdashboard-link">
          <Link to="/complanding">
            <img
              src="./src/assets/home.png"
              alt="home-icon"
              className="cdash-icon"
            />
            Dashboard
          </Link>
        </li>
        <li className="cdashboard-link">
          <Link to="/addjob"> 
            <img
              src="./src/assets/search.png"
              alt="search-icon"
              className="cdash-icon"
            />
            Post Job
          </Link>
        </li>
        <li className="cdashboard-link">
          <Link to="/candidate/mock-interview">
            <img
              src="./src/assets/interview.png"
              alt="interview-icon"
              className="cdash-icon"
            />
            Application
          </Link>
        </li>
        {/* <li className="cdashboard-link">
        <Link to="/profilepage"> 
            <img
              src="./src/assets/profile.png"
              alt="profile-icon"
              className="cdash-icon"
            />
             User Profile
          </Link>
        </li> */}
        <li className="cdashboard-link">
          <Link to="/candidate/settings">
            <img
              src="./src/assets/settings.png"
              alt="settings-icon"
              className="dash-icon"
            />
            Account Settings
          </Link>
        </li>
        <li className="cdashboard-link">
          <Link
            onClick={async () => {
              console.log("Logout clicked");
              try {
                await googleLogout();
                console.log("Logout successful");
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
            to="/landing"
          >
            <img
              src="./src/assets/logout.png"
              alt="logout-icon"
              className="cdash-icon"
            />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default CompanyDashboard