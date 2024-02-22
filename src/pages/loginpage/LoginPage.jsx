import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import axios from "axios";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // Using async/await to wait for the axios.post request to resolve
      const response = await axios.post("http://localhost:8000/api/user", {
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
  

  // const handleLoginSuccess = async (response) => {
  //   // Assuming `response` includes a property `credential` with the OAuth token
  //   const token = response.credential;

  //   try {
  //     const res = await axios.post("http://localhost:8000/api/user", { token });
  //     console.log("Success:", res.data);
  //     navigate("/homepage");
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   }
  // };

  return (
    <div className="main-container">
      <div className="login-container">
        <img src="./src/assets/logo.png" alt="logo" />
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
          <text>Or</text>
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
  );
}

export default LoginPage;
