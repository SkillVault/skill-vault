import React, { useState, useEffect } from "react";
import "../ProfileForm/ProfileForm.css";
import "./ProfileInfo.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileInfo = ({ onEditClick }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [statename, setStatename] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [aboutMe, setAboutMe] = useState(
    " Hello! My name is [Your Name] and I am passionate about [Your Passion or Interest].I enjoy [What you enjoy doing] and I am always eager to [What you like to learn or achieve]."
  );
  const token = localStorage.getItem("token")
  const decoded = jwtDecode(token);
  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/get_user?email=${decoded.email}`
    );
    const userData = response.data;
    setEmail(userData.email);
    setUsername(userData.username);
    setAboutMe(userData.about_me);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setCountry(userData.address.country);
    setAddress(userData.address.first_line);
    setCity(userData.address.city);
    setPostal(userData.address.postal_code);
    setStatename(userData.address.state);

    console.log(userData)
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

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
