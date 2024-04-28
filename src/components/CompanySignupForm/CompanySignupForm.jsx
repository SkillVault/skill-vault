import React, { useState } from "react";
import "./CompanySignupFrom.css"; // Import CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanySignupForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/company/signup",
        {
          company_name: companyName,
          company_email: companyEmail,
          company_website: companyWebsite,
          password: password,
        }
      );
      console.log("Signup response:", response.data);
      window.location.reload();

    } catch (err) {
      console.error("Error signing up:", err.message);
      if (err.response && err.response.status === 500) {
        setError("Internal server error. Please try again later.");
      } else {
        setError("Error signing up. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className="company-signup-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="company-signupform-group">
        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Your company name"
          required
        />
      </div>
      <div className="company-signupform-group">
        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          placeholder="Your company email"
          required
        />
      </div>
      <div className="company-signupform-group">
        <label htmlFor="companyWebsite">Company Website (Optional):</label>
        <input
          type="url"
          id="companyWebsite"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          placeholder="Your company website"
        />
      </div>
      <div className="company-signupform-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </div>
      <div className="company-signupform-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
        />
      </div>
      <button
        type="submit"
        id="company-signupform-button"
        className={loading ? "loading" : ""}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default CompanySignupForm;
