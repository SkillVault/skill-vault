import React, { useState } from "react";
import "../../components/ProfileForm/ProfileForm.css";
import "./ProfileInfo.css";

const ProfileInfo = ({ onEditClick }) => {
  const [username, setUsername] = useState("User1234");
  const [email, setEmail] = useState("example@gmail.com");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Miller");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("India");
  const [statename, setStatename] = useState("Kerala");
  const [city, setCity] = useState("Ernakulam");
  const [postal, setPostal] = useState("686670");
  const [aboutMe, setAboutMe] = useState(
    " Hello! My name is [Your Name] and I am passionate about [Your Passion or Interest].I enjoy [What you enjoy doing] and I am always eager to [What you like to learn or achieve]."
  );

  return (
    <div className="form-outer-container">
      <h3 style={{ fontSize: "26px", paddingLeft: "17px" }}>MY ACCOUNT</h3>
      <div className="form-inner-container">
        <form action="" method="post">
          <h4>USER INFORMATION</h4>
          <section className="user-information-grid">
            <div className="data-field">
              <label htmlFor="username">Username :</label>
              <br />
              <span>{username}</span>
            </div>
            <div className="data-field">
              <label htmlFor="email">Email Address :</label>
              <br />
              <span>{email}</span>
            </div>
            <div className="data-field">
              <label htmlFor="first-name">First Name :</label>
              <br />
              <span>{firstName}</span>
            </div>
            <div className="data-field">
              <label htmlFor="last-name">Last Name :</label>
              <br />
              <span>{lastName}</span>
            </div>
          </section>
          <hr />
          <h4>CONTACT INFORMATION</h4>
          <section className="contact-information-grid">
            <div className="data-field">
              <label htmlFor="1staddress">Address Line 1:</label>
              <br />
              <span>{address}</span>
            </div>
            <div className="data-field">
              <label htmlFor="country">Country :</label>
              <br />
              <span>{country}</span>
            </div>
            <div className="data-field">
              <label htmlFor="state">State :</label>
              <br />
              <span>{statename}</span>
            </div>
            <div className="data-field">
              <label htmlFor="city">City :</label>
              <br />
              <span>{city}</span>
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <span>{postal}</span>
            </div>
          </section>
          <hr />
          <h4>ABOUT ME</h4>
          <section className="about-information-grid">
            <div className="data-field">
              <label htmlFor="about-me">About Me:</label>
              <br />
              <p>{aboutMe}</p>
            </div>
          </section>
          <div className="edit-button">
            <button onClick={onEditClick}>Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
