import React, { useState } from "react";
import "./CandidateLoginForm.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CandidateLoginForm() {

  const [candidateEmail, setCandidateEmail] = useState("");
  const [currentuserSub , setUserSub] = useState("");
  const [usrFirstName, setFirstName] = useState("");
  const [usrLastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true); // Set loading state to true during login request

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      console.log("started");
      const response = await axios.post("http://localhost:8000/api/user/candidate_login", {
        email: candidateEmail,
        password: password,
      });
      console.log("Login response:", response.data);
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
    }
       finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (googleData) => {
    console.log("Received googleData:", googleData);

    const { credential } = googleData;
    const decoded = jwtDecode(credential);

    const userEmail = decoded.email;
    const userName = decoded.name;
    // Split the full name by space
    const nameParts = userName.split(" ");

    // If the name contains more than one part
    if (nameParts.length > 1) {
      // The first part is the first name
      const firstName = nameParts[0];
      // The rest of the parts joined by space are the last name
      const lastName = nameParts.slice(1).join(" ");

      console.log("First Name:", firstName);
      setFirstName(firstName);
      console.log("state First Name:", usrFirstName);
      console.log("Last Name:", lastName);
      setLastName(lastName);
    } else {
      // If the name contains only one part, consider it as the first name
      const firstName = nameParts[0];
      setFirstName(firstName);
      console.log("First Name:", firstName);
      console.log("state First Name:", usrFirstName);

      
    }
    const currentuserSub = decoded.sub;
    localStorage.setItem("userSub", currentuserSub);
    setUserSub(currentuserSub);
    console.log(currentuserSub);
    const userProfilePicUrl = decoded.picture;
    console.log(decoded);

    try {
      let checkUserResponse = await axios.get(
        `https://skillvault-backend.onrender.com/api/user/get_user?user_sub=${currentuserSub}`
      );

      if (!checkUserResponse.data) {
        // If the user doesn't exist, create a new one
        const response = await axios.post(
          "https://skillvault-backend.onrender.com/api/user/create_google_user",
          {
            user_name: userEmail,
            user_mail: userEmail,
            profile_url: userProfilePicUrl,
            user_sub: currentuserSub,
            first_name: usrFirstName,
            last_name: usrLastName,
            country: "",
            state: "",
            city: "",
            postal_code: "",
            about: "",
            address: ""
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
        // Perform any other actions you need
      }
    } catch (error) {
      console.error("Failed:", error.response ? error.response : error);
    }

    console.log("Google login success, navigating to /homepage");
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