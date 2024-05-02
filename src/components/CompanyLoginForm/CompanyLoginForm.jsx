import React, { useState } from "react";
import "./CompanyLoginForm.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CompanyLoginForm() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const response = axios.get('/fetch_company')

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post(
        "http://127.0.0.1:8000/api/company/login",
        {
          company_email: companyEmail,
          password: password,
        }
      );

      localStorage.setItem("companyEmail", companyEmail);

      console.log("Company Email:", companyEmail);
      console.log("Password:", password);

      // Check if the login was successful
      if (response.data) {
        // Navigate to the landing page
        navigate("/complanding");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("Error logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="company-login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="company-login-form-group">
        <label htmlFor="companyEmail">Company Email:</label>
        <input
          type="email"
          id="companyEmail"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          placeholder="Your company email"
          required
        />
      </div>
      <div className="company-login-form-group">
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
      <button
        type="submit"
        id="company-loginform-button"
        className={loading ? "loading" : ""}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}

export default CompanyLoginForm;
