// Import React and other necessary modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import axios from "axios";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // Using async/await to wait for the axios.post request to resolve
     response = await axios.post("http://localhost:8000/api/add_user", {
        mailid: email,
        password: password,
      }).then(value =>{
        navigate("/homepage");
      });
  
      // Now response is available in this scope
      if (response.status === 200 || response.status === 201) {
       
      } else {
        console.error("Failed to login:", response);
      }
    } catch (error) {
      console.error("Failed:", error.response ? error.response : error);
    }
  };



  return (
    <div>
      <LandingNavbar />
    <div className="main-container">
      <div className="login-container">
        <img src="/src/assets/logo.png" alt="logo"  />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="userEmail"
          placeholder="email address"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="userPassword"
          placeholder="password"
        />
        <button
          className="loginBtn"
          onClick={handleSubmit} // Call handleSubmit function when button is clicked
        >
          Login
        </button>
        <div className="singleLine">
          <div className="line"></div>
          <span>Or</span>
          <div className="line"></div>
        </div>
        <GoogleLogin
          clientId="109725098981-becg76b1emp5dnji0n1tla3j43743lgn.apps.googleusercontent.com"
          onSuccess={() => navigate("/homepage")}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
