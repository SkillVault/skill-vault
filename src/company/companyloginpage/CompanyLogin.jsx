import React from 'react'
import "./CompanyLogin.css"
const CompanyLogin = () => {
  return (
    <div className="main-div">
      <div className="login-div">
        <img src="./src/assets/logo.png" />
        <h3>SkillVault</h3>
        <input type="email" id="userEmail" placeholder="Email" />
        <input type="password" id="userPassword" placeholder="Password" />
        <div className="checkbox">
          <input type='checkbox' id="checkbox"/>
          <label>Remember me</label>
        </div>
        <button
          className="loginBtn"
          onClick={() => {
            navigate("/homepage");
          }}
        >
        Sign in
        </button>
      </div>
      <div className="new">
        <a href=''>Forgot password?</a>
        <a href=''>Create new account</a>
      </div>
    </div>
  )
}

export default CompanyLogin