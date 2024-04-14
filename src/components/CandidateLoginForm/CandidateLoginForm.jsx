import React, { useState } from "react";
import "./CandidateLoginForm.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CandidateLoginForm() {

  const [candidateEmail, setCandidateEmail] = useState("");
  const [usrFirstName, setFirstName] = useState("");
  const [usrLastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      console.log("started");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/candidate_login",
        {
          email: candidateEmail,
          password: password,
        }
      );
      const decoded = jwtDecode(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
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


  const handleGoogleSuccess = async (googleData) => {
    console.log("Received googleData:", googleData);

    const { credential } = googleData;
    const decoded = jwtDecode(credential);
    console.log(decoded)
    localStorage.setItem("token", credential)

    const userEmail = decoded.email;
    const userName = decoded.name;
    const nameParts = userName.split(" ");
    if (nameParts.length > 1) {
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      console.log("First Name:", firstName);
      setFirstName(firstName);
      console.log("Last Name:", lastName);
      setLastName(lastName);
    } else {
      const firstName = nameParts[0];
      setFirstName(firstName);
      console.log("First Name:", firstName);
      console.log("state First Name:", usrFirstName);

      
    }
    const userProfilePicUrl = decoded.picture;

    try {
      let checkUserResponse = await axios.get(
        `http://127.0.0.1:8000/api/user/get_user?email=${userEmail}`
      );

      console.log(checkUserResponse)

      if (!checkUserResponse.data) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/create_google_user",
          {
              username: usrFirstName,
              email: userEmail,
              password: "",
              first_name: usrFirstName,
              last_name: usrLastName,
              address: {
                  first_line: "",
                  country: "", 
                  state: "",
                  city: "",
                  pincode: 0 
              },
              job_role: "",
              company: "",
              experience: 0, 
              resume: "",
              photo: userProfilePicUrl,
              about_me: "",
              skills: "", 
              interview_scores: "" 
          }
      );

        if (response.status === 200 || response.status === 201) {
          navigate("/homepage");
        } else {
          console.error("Failed to login:", response);
        }
      } else {
        navigate("/homepage");
        console.log("User already exists:", checkUserResponse.data);
      }
    } catch (error) {
      console.error("Failed:", error.response ? error.response : error);
    }

    console.log("Google login success, navigating to homepage");
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Sign In Failed:", error);
  };

  return (
    <form className="candidate-login-form" onSubmit={handleLogin}>
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