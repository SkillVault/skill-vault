import React, { useState } from "react";
import "./CandidateLoginForm.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CandidateLoginForm() {
  const [candidateEmail, setCandidateEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const response = axios.get('/fetch_company')

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Simulate backend call (replace with actual API call)
    try {
      // Your API call here

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Candidate Email:", candidateEmail);
      console.log("Password:", password);

      // Redirect to dashboard or handle success response
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("Error logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess =  async  (googleData)=> {

    console.log('Received googleData:', googleData); 
  


    // Correctly use googleData to extract the credential
    const { credential } = googleData; // Extract the JWT token from the googleData
    const decoded = jwtDecode(credential); // Decode the JWT to get the user's data

    // Now you can access user information from the decoded object
    const userEmail = decoded.email;
    const userName = decoded.name;
    const userProfilePicUrl = decoded.picture;

    try {
      // Using async/await to wait for the axios.post request to resolve
      response = await axios
        .post("http://localhost:8000/api/user/create_google_user", {
          user_name: userName,
          user_mail: userEmail,
          profile_url: userProfilePicUrl
        })
        .then((value) => {
          navigate("/homepage");
        });

      // Now response is available in this scope
      if (response.status === 200 || response.status === 201) {
      } else {
        console.error("Failed to login:", response);
      }
    } catch (error) {
      console.error("Failed:", error.response ? error.response : error);
    }
    
    console.log("Google login success, navigating to /homepage");
    // Perform any necessary operations here, like API calls
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Sign In Failed:", error);
  };

  return (
    <form className="candidate-login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="candidate-login-form-group">
        <label htmlFor="candidateEmail">Candidate Email:</label>
        <input
          type="email"
          id="candidateEmail"
          value={candidateEmail}
          onChange={(e) => setCandidateEmail(e.target.value)}
          placeholder="Your candidate email"
          required
        />
      </div>
      <div className="candidate-login-form-group">
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
        id="candidate-loginform-button"
        className={loading ? "loading" : ""}
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
      <div className="singleLine">
        <div className="line"></div>
        <span>OR</span>
        <div className="line"></div>
      </div>
      <div className="google-signin-container">
      <GoogleLogin
        clientId="109725098981-becg76b1emp5dnji0n1tla3j43743lgn.apps.googleusercontent.com"
        onSuccess={handleGoogleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      </div>
    </form>
  );
}

export default CandidateLoginForm;
