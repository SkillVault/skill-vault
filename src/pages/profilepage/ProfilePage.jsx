import React, { useState } from "react";
import "../../components/LandingNav/LandingNav";

import Dashboard from "../../components/Dashboard/Dashboard";
import ProfileSlide from "../../components/ProfileSlide/ProfileSlide";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false); // State to manage editing mode

  // Function to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFormSubmit = () => {
    setIsEditing(!isEditing); // Exit editing mode
  };

  return (
    <div className="profile-container">
      <Dashboard />
      <ProfileSlide />
      {isEditing ? (
        <ProfileForm onFormSubmit={handleFormSubmit} /> // Pass onFormSubmit function as a prop
      ) : (
        <ProfileInfo onEditClick={toggleEditing} /> // Pass onEditClick function as a prop
      )}
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
