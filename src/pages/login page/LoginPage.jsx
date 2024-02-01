import React from "react";
import "./LoginPage.css";
function LoginPage() {
  return (
    <div className="login-container">
      <div className="container">
        <img src="./src/assets/logo.png" />
        <input type="email" id="userEmail" placeholder="email address"/>
        <input type="password" id="userPassword" placeholder="password"/>
        <button className="loginBtn">Login</button>
        <div className="singleLine">
          <div className="line"></div>
          <text>Or</text>
          <div className="line"></div>
        </div>
        <button className="googleLoginBtn">Sign in with google</button>

      </div>
    </div>
  );
}

export default LoginPage;
