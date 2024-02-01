import React from "react";
import LandingNavbar from "../components/landingNav";
import "./landingPage.css";

const LandingPage = () => (
  <div className="landing-page">
    <LandingNavbar />

    <div className="content-container">
      {/* Add your landing page content here, like headings, descriptions, buttons, etc. */}
      <h1 style={{ fontSize: "75px" }}>Skill Vault</h1>
      <h1 style={{ color: "purple", fontSize: "60px" }}>Explore your skills</h1>
      <p>
        This is a placeholder description. Replace it with your own compelling
        text.
      </p>
      <button>Sign Up Now</button>
    </div>
  </div>
);

export default LandingPage;
