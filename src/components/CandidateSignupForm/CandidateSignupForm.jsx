import React, { useState } from "react";
import "./CandidateSignupFrom.css"; // Import CSS file for styling
import axios from "axios";

function CandidateSignupForm() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateWebsite, setCandidateWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Perform data validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Simulate backend call (replace with actual API call)
    try {
      // Your API call here

      // // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.post("http://localhost:8000/api/candidate_signup",{
        "candidate_name": candidateName,
        "candidate_email": candidateEmail,
        "candidate_website": candidateWebsite,
        "password" : password
        
      }).then(value => {
        console.log(response)
      })

      console.log("Candidate:", candidateName, candidateEmail, candidateWebsite);

      // Redirect to confirmation page or handle success response
    } catch (err) {
      console.error("Error signing up:", err.message);
      setError("Error signing up. Please try again later.");
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
          id="candiateEmail"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
          placeholder="Your candidate email"
          required
        />
      </div>
      <div className="candidate-signupform-group">
        <label htmlFor="candidateWebsite">Candiate Website (Optional):</label>
        <input
          type="url"
          id="candidateWebsite"
          value={candidateWebsite}
          onChange={(e) => setCandidateWebsite(e.target.value)}
          placeholder="Your candidate website"
        />
      </div>
      <div className="candidate-signupform-group">
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
