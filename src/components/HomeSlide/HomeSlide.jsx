import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeSlide.css";
import { jwtDecode } from "jwt-decode";

const HomeSlide = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setEmail(decoded.email);
  }, [decoded.email]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/get_user?email=${email}`
      );
      const userData = response.data;
      setUserName(userData.username);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserProfile();
    }
  }, [email]);

  return (
    <div className="slide-container">
      <div className="slide-image-container">
        <img src="/src/assets/stars.jpg" alt="" />
        <div className="slide-message">
          <h2 style={{ fontSize: "40px" }}>Welcome {userName}</h2>
          <p style={{ paddingTop: "10px" }}>
            Connect with Top Employers & Land Your Dream Job
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;
