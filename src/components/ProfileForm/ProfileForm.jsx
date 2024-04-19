import React, { useEffect, useState } from "react";
import "./ProfileForm.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileForm = ({ onFormSubmit }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    address: {
      first_line: "",
      country: "",
      state: "",
      city: "",
      postal_code: ""
    },
    phone_number: "",
    company: "",
    job_role: "",
    experience: "",
    about_me: ""
  });

  const [currentEmail, setCurrentEmail] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  setCurrentEmail(decodedToken.email);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/get_user?email=${currentEmail}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [currentEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/candidate/profile_update",
        { email: currentEmail, candidate_data: userData }
      );
      console.log(response);
      onFormSubmit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <div className="form-outer-container">
      <h3 style={{ fontSize: "26px", paddingLeft: "17px" }}>MY ACCOUNT</h3>
      <div className="form-inner-container">
        <form action="" method="post" onSubmit={handleSubmit}>
          <h4>USER INFORMATION</h4>
          <section className="user-information-grid">
            <div className="data-field">
              <label htmlFor="username">Username :</label>
              <br />
              <input
                type="text"
                name="username"
                value={userData.username}
                placeholder="Username123"
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="email">Email Address :</label>
              <br />
              <input
                type="email"
                name="email"
                value={userData.email}
                placeholder="example@xyz.com"
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="first-name">First Name :</label>
              <br />
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                placeholder="First Name"
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="last-name">Last Name :</label>
              <br />
              <input
                required
                type="text"
                name="last_name"
                value={userData.last_name}
                placeholder="Last Name"
                className="form-input"
                onChange={handleChange}
              />
            </div>
          </section>
          <hr />
          <h4>CONTACT INFORMATION</h4>
          <section className="contact-information-grid">
            <div className="data-field address-field">
              <label htmlFor="1staddress"> Address Line 1:</label>
              <br />
              <input
                type="text"
                name="first_line"
                value={userData.address.first_line}
                placeholder="House No. , Street Name "
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="country">Country :</label>
              <br />
              <input
                type="text"
                name="country"
                placeholder="Country Name"
                value={userData.address.country}
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="state">State :</label>
              <br />
              <input
                type="text"
                name="state"
                value={userData.address.state}
                placeholder="State Name"
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="city">City :</label>
              <br />
              <input
                type="text"
                name="city"
                value={userData.address.city}
                placeholder="City Name"
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <input
                type="number"
                name="postal_code"
                value={userData.address.postal_code}
                placeholder="000000"
                maxLength={6}
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
            <div className="data-field phone-field">
              <label htmlFor="phone_number">Phone Number :</label>
              <br />
              <input
                type="number"
                name="phone_number"
                value={userData.phone_number}
                placeholder="9888000000"
                maxLength={10}
                className="form-input"
                required
                onChange={handleChange}
              />
            </div>
          </section>
          <hr />
          <h4> PROFESSIONAL INFORMATION</h4>
          <section className="user-information-grid">
            <div className="data-field">
              <label htmlFor="company_name">Company :</label>
              <br />
              <input
                type="text"
                name="company"
                value={userData.company}
                placeholder="Amazon"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="job_role">Job Role :</label>
              <br />
              <input
                type="text"
                name="job_role"
                value={userData.job_role}
                placeholder="DevOps Engineer"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="experience">Experience in Years :</label>
              <br />
              <input
                type="number"
                name="experience"
                value={userData.experience}
                placeholder="1"
                className="form-input"
                onChange={handleChange}
              />
            </div>
          </section>
          <hr />

          <h4>UPLOADS</h4>
          <section className="upload-information-grid">
            <div className="data-field">
              <label htmlFor="profile-photo">Profile Photo:</label>
              <br />
              <input
                type="file"
                name="profile_photo"
                accept="image/*"
                className="form-input"
                onChange={handleChange}
              />
            </div>
            <div className="data-field">
              <label htmlFor="resume">Resume:</label>
              <br />
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="form-input"
                onChange={handleChange}
              />
            </div>
          </section>
          <hr />
          <h4>ABOUT ME</h4>
          <section className="about-information-grid">
            <div className="data-field">
              <label htmlFor="about_me">About Me: :</label>
              <br />
              <textarea
                name="about_me"
                cols="50"
                rows="10"
                value={userData.about_me}
                placeholder="I am ......."
                className="form-input"
                onChange={handleChange}
              ></textarea>
            </div>
          </section>
          <div className="change-button">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
