import React from "react";
import "./CompanyDashboard.css";
import { googleLogout } from '@react-oauth/google';
import { Link } from "react-router-dom";

const CompanyDashboard = () => {
  return (
    <nav className="dashboard">
      <ul className="dashboard-links">
        <li className="dashboard-link">
          <Link to="/homepage">
            <img
              src="/src/assets/home.png"
              alt="home-icon"
              className="dash-icon"
            />
            Dashboard
          </Link>
        </li>
        <li className="dashboard-link">
          <Link to="/jobsearch"> 
            <img
              src="/src/assets/search.png"
              alt="search-icon"
              className="dash-icon"
            />
            Mock Interview
          </Link>
        </li>
        <li className="dashboard-link">
          <Link to="/mockinterview">
            <img
              src="/src/assets/interview.png"
              alt="interview-icon"
              className="dash-icon"
            />
            Jobs
          </Link>
        </li>
        <li className="dashboard-link">
        <Link to="/profilepage"> 
            <img
              src="/src/assets/profile.png"
              alt="profile-icon"
              className="dash-icon"
            />
            User Profile
          </Link>
        </li>
        <li className="dashboard-link">
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
              src="/src/assets/logout.png"
              alt="logout-icon"
              className="dash-icon"
            />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default CompanyDashboard
