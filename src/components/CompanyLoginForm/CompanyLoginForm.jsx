import React, { useState } from "react";
import "./CompanyLoginForm.css"; 

function CompanyLoginForm() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Simulate backend call (replace with actual API call)
    try {
      // Your API call here

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Company Email:", companyEmail);
      console.log("Password:", password);

      // Redirect to dashboard or handle success response
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
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}

export default CompanyLoginForm;
