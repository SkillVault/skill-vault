import React from "react";
import "./ProfileSlide.css";

const ProfileSlide = () => {
  return (
    <div className="home-slide-container">
      <div className="home-slide-image-container">
        <img src="./src/assets/raindrops.jpg" alt="" />
        <div className="home-slide-message">
          <h3 style={{ fontSize: "25px" }}>
            View and Update Your Profile Here <br />
          </h3>
          <h3 style={{ fontSize: "25px", paddingTop : "10px"}}>
            Build Your Future 
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlide;
