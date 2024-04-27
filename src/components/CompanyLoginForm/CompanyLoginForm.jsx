import React, { useState } from "react";
import "./CompanyLoginForm.css"; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function CompanyLoginForm() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      console.log("started");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/company/company_login",
        {
          company_email: companyEmail,
          password: password,
        }
      );
      const decoded = jwtDecode(response.data.access_token);
      localStorage.setItem("company_token", response.data.access_token);
      navigate("/homepage");
    } catch (err) {
      console.error("Error logging in:", err.message);
      if (err.response && err.response.status === 404) {
        setError("Incorrect email or user doesn't exist.");
      } else if (err.response && err.response.status === 401) {
        setError("Incorrect password.");
      } else {
        setError("Error logging in. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <form className="company-login-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="company-login-form-group">
        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          onChange={(e) => setCompanyEmail(e.target.value)}
          placeholder="Your company email"
          required
        />
      </div>
      <div className="company-login-form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </div>
      <button
        type="submit"
        id="company-loginform-button"
        className={loading ? "loading" : ""}
        disabled={loading}
        onClick={handleLogin}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}

export default CompanyLoginForm;
