import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <nav className="dashboard">
      <ul className="dashboard-links">
        <li className="dashboard-link">
          <a href="/candidate/home">
            <img
              src="./src/assets/home.png"
              alt="home-icon"
              className="dash-icon"
            />
            Home
          </a>
        </li>
        <li className="dashboard-link">
          <a href="/candidate/search">
            <img
              src="./src/assets/search.png"
              alt="search-icon"
              className="dash-icon"
            />
            Search
          </a>
        </li>
        <li className="dashboard-link">
          <a href="/candidate/mock-interview">
            <img
              src="./src/assets/interview.png"
              alt="interview-icon"
              className="dash-icon"
            />
            Mock Interview
          </a>
        </li>
        <li className="dashboard-link">
          <a href="/candidate/profile">
            <img
              src="./src/assets/profile.png"
              alt="profile-icon"
              className="dash-icon"
            />
            Profile
          </a>
        </li>
        <li className="dashboard-link">
          <a href="/candidate/settings">
            <img
              src="./src/assets/settings.png"
              alt="settings-icon"
              className="dash-icon"
            />
            Account Settings
          </a>
        </li>
        <li className="dashboard-link">
          <a href="/logout">
            <img
              src="./src/assets/logout.png"
              alt="logout-icon"
              className="dash-icon"
            />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Dashboard;
