import React, { useState, useEffect } from "react";
import "../ProfileForm/ProfileForm.css";
import "./ProfileInfo.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileInfo = ({ onEditClick }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [experiance, setExperiance] = useState();
  const [skills, setSkills] = useState();
  const [aboutMe, setAboutMe] = useState(
    " Hello! My name is [Your Name] and I am passionate about [Your Passion or Interest].I enjoy [What you enjoy doing] and I am always eager to [What you like to learn or achieve]."
  );

  const storedUserEmail = localStorage.getItem("userEmail");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/get_user?email=${storedUserEmail}`
    );
    const userData = response.data;
    console.log(userData);
    setEmail(userData.email);
    setUsername(userData.username);
    setAboutMe(userData.about_me);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setPhone(userData.phone_number);
    setCompany(userData.company);
    setExperiance(userData.experience);
    setSkills(userData.skills);
    setAddress({
      first_line: userData.address.first_line || "",
      country: userData.address.country || "",
      state: userData.address.state || "",
      city: userData.address.city || "",
      pincode: userData.address.pincode || "", // Assuming pincode is a string
    });
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
              <span>{address.first_line}</span>
            </div>
            <div className="data-field">
              <label htmlFor="country">Country :</label>
              <br />
              <span>{address.country}</span>
            </div>
            <div className="data-field">
              <label htmlFor="state">State :</label>
              <br />
              <span>{address.state}</span>
            </div>
            <div className="data-field">
              <label htmlFor="city">City :</label>
              <br />
              <span>{address.city}</span>
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <span>{address.pincode}</span>
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Phone Number :</label>
              <br />
              <span>{phone}</span>
            </div>
          </section>
          <hr />
          <h4>PROFESSIONAL INFORMATION</h4>
          <section className="contact-information-grid">
            <div className="data-field">
              <label htmlFor="1staddress">Experiance:</label>
              <br />
              <span>{experiance + " Years"}</span>
            </div>
            <div className="data-field">
              <label htmlFor="country">Previous Work Experiance :</label>
              <br />
              <span>{company}</span>
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
