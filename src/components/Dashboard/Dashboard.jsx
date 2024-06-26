import React from "react";
import "./Dashboard.css";
import { googleLogout } from '@react-oauth/google';
import { Link } from "react-router-dom";

const Dashboard = () => {
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
            Home
          </Link>
        </li>
        <li className="dashboard-link">
          <Link to="/jobsearch"> 
            <img
              src="/src/assets/search.png"
              alt="search-icon"
              className="dash-icon"
            />
            Search
          </Link>
        </li>
        <li className="dashboard-link">
          <Link to="/skill">
            <img
              src="/src/assets/interview.png"
              alt="interview-icon"
              className="dash-icon"
            />
            Mock Interview
          </Link>
        </li>
        <li className="dashboard-link">
        <Link to="/profilepage"> 
            <img
              src="/src/assets/profile.png"
              alt="profile-icon"
              className="dash-icon"
            />
            Profile
          </Link>
        </li>
        <li className="dashboard-link">
          <Link to="/candidate/settings">
            <img
              src="/src/assets/settings.png"
              alt="settings-icon"
              className="dash-icon"
            />
            Account Settings
          </Link>
        </li>
        <li className="dashboard-link">
          <Link
            onClick={async ()  => {
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

export default Dashboard;
