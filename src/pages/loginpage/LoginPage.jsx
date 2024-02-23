// Import React and other necessary modules
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <LandingNavbar />
    <div className="main-container">
      <div className="login-container">
        <img src="/src/assets/logo.png" alt="Logo" />
        <input type="email" id="userEmail" placeholder="email address" />
        <input type="password" id="userPassword" placeholder="password" />
        <button
          className="loginBtn"
          onClick={() => {
            navigate("/homepage");
          }}
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
    </div>
  );
}

export default LoginPage;
