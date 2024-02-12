import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../../components/LandingNav/LandingNav";

import "./LoginPage.css";
function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <LandingNavbar />
      <div className="login-container">
        <div className="container">
          <img src="./src/assets/logo.png" />
          <input type="email" id="userEmail" placeholder="email address" />
          <input type="password" id="userPassword" placeholder="password" />
          <button className="loginBtn" onClick={() => navigate("/homepage")}>Login</button>
          <div className="singleLine">
            <div className="line"></div>
            <text>Or</text>
            <div className="line"></div>
          </div>

          <button
            className="googleLoginBtn"
            onClick={() => navigate("/landing")}
          >
            Sign in with google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
