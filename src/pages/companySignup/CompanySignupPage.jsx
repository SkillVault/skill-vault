import React, { useState } from "react";
import CompanySignupForm from "../../components/CompanySignupForm/CompanySignupForm";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import CompanyLoginForm from "../../components/CompanyLoginForm/CompanyLoginForm";
import "./CompanySignupPage.css";

const CompanySignupPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const toggleSignupForm = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  return (
    <div>
      <LandingNavbar />
      <div className="company-signup-outer-container">
        <div className="company-signup-inner-container">
          <div className="company-signup-login">
            <button className="company-login-button" onClick={toggleLoginForm}>Login</button>
            <div className="vertical-line" />
            <button className="company-signin-button" onClick={toggleSignupForm}>Sign up</button>
          </div>
          <div className={`company-form-container ${showLoginForm ? "" : "hide"}`}>
            <CompanyLoginForm />
          </div>
          <div className={`company-form-container ${showSignupForm ? "" : "hide"}`}>
            <CompanySignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanySignupPage;
