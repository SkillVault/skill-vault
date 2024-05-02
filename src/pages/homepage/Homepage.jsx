import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import HomeSlide from "../../components/HomeSlide/HomeSlide";
import Notification from "../../components/Notification/Notification";
import ProgressSection from "../../components/ProgressSection/ProgressSection";
import {jwtDecode} from 'jwt-decode';
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/company/login"); // No token present, redirect to login page
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token"); // Remove expired token from local storage
      navigate("/company/login"); // Redirect to login page
      return;
    }
  }, [navigate]);

  return (
    <div className="homepage-container">
      <div className="sidebar">
        <Dashboard />
      </div>
      <main className="main-content">
        <HomeSlide />
        <div className="notification-progress">
          <hr />
          <Notification />
         
        </div>
      </main>
    </div>
  );
};
export default Homepage;
