import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5173/api/saveData', { email, password });

      console.log('Data saved successfully');
      // Redirect to homepage after successful submission
      navigate("/homepage");
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <img src="./src/assets/logo.png" alt="logo" />
        <input type="email" onChange={(e) => setEmail(e.target.value)} id="userEmail" placeholder="email address" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} id="userPassword" placeholder="password" />
        <button
          className="loginBtn"
          onClick={
            ()=> navigate('/homepage')
          } // Call handleSubmit function when button is clicked
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
          onSuccess={(credentialResponse) => {
            navigate("/homepage");
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
