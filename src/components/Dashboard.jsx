import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <nav className="dashboard">
      <ul className="dashboard-links">
        <li className="dashboard-link">
          <i className="fas fa-home"></i>
          <a href="/candidate/home">Home</a>
        </li>
        <li className="dashboard-link">
          <i className="fas fa-search"></i>
          <a href="/candidate/search">Search</a>
        </li>
        <li className="dashboard-link">
          <img src="path/to/mock-interview-logo.png" alt="Mock Interview" />
          <a href="/candidate/mock-interview">Mock Interview</a>
        </li>
        <li className="dashboard-link">
          <img src="path/to/profile-logo.png" alt="Profile" />
          <a href="/candidate/profile">Profile</a>
        </li>
        <li className="dashboard-link">
          <img src="path/to/settings-logo.png" alt="Account Settings" />
          <a href="/candidate/settings">Account Settings</a>
        </li>
        <li className="dashboard-link">
          <i className="fas fa-sign-out-alt"></i>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Dashboard;
