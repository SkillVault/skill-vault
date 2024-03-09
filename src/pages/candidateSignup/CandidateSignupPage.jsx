import React, { useState } from "react";
import CandidateSignupForm from "../../components/CandidateSignupForm/CandidateSignupForm";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import CandidateLoginForm from "../../components/CandidateLoginForm/CandidateLoginForm";
import "./CandidateSignupPage.css";

const CandidateSignupPage = () => {
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
      <div className="candidate-signup-outer-container">
        <div className="candidate-signup-inner-container">
          <div className="candidate-signup-login">
            <button className="candidate-login-button" onClick={toggleLoginForm}>Login</button>
            <div className="vertical-line" />
            <button className="candidate-signin-button" onClick={toggleSignupForm}>Sign up</button>
          </div>
          <div className={`candidate-form-container ${showLoginForm ? "" : "hide"}`}>
            <CandidateLoginForm />
          </div>
          <div className={`candidate-form-container ${showSignupForm ? "" : "hide"}`}>
            <CandidateSignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CandidateSignupPage;
