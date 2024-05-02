import React, { useState } from "react";
import "./CandidateSignupFrom.css";
import axios from "axios";

function CandidateSignupForm() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
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
        "http://127.0.0.1:8000/api/user/candidate_signup",
        {
          username: candidateName,
          email: candidateEmail,
          password: password,
        }
      );
      console.log("Signup response:", response.data);
      // Redirect to login page or show success message
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
    <form className="candidate-signup-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="candidate-signupform-group">
        <label htmlFor="candidateName">Candidate Name:</label>
        <input
          type="text"
          id="candidateName"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Your candidate name"
          required
        />
      </div>
      <div className="candidate-signupform-group">
        <label htmlFor="candidateEmail">Candidate Email:</label>
        <input
          type="email"
          id="signupcandidateEmail" // Fixed typo here
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
          placeholder="Your candidate email"
          required
        />
      </div>
      <div className="candidate-signupform-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="signuppassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
      </div>
      <div className="candidate-signupform-group">
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
        id="candidate-signupform-button"
        className={loading ? "loading" : ""}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}

export default CandidateSignupForm;
