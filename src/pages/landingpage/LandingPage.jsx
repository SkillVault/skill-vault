import React from "react";
import LandingNavbar from "../../components/LandingNav/LandingNav";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="landing-page">
    <div className="content-container">
      <LandingNavbar />
      <h1 style={{ fontSize: "75px", fontFamily: "Verdana, sans-serif" }}>
        Skill Vault
      </h1>
      <h1 style={{ color: "#54249b", fontSize: "60px" }}>
        Explore your skills
      </h1>
      <img
        src="/src/assets/dialogue-executives.jpg"
        alt="Background image"
        className="background-image"
      />
      <div className="details-card">
        <p style={{  }}>
          Skill Vault is more than just a platform, it's your personalized
          roadmap to mastering the skills you need to achieve your career goals.
          Whether you're a seasoned professional looking to upskill or a budding
          talent taking your first steps into the workforce, Skill Vault
          empowers you discover, master and connect.
        </p>
      </div>
      <a href="/login" id="sign-up-button">
        Sign Up Now
      </a>
    </div>
  </div>
);

export default LandingPage;