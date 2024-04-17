import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const PublicProfile = () => {

  const { userId } = useParams();
  const encodedEmail = encodeURIComponent(userId);
  console.log(encodedEmail)
  
  console.log(`getting user id ${userId}`)
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



  const fetchUsrProfile = async () => {
    if (!userId) {
      console.log("No userId available");
      return;
    }
  
    try {
      const response = await axios.get(
        `https://skillvault-backend.onrender.com/api/user/get_profile?username=${userId}`
      );
      console.log("API Response:", response); // Log the full response
      const userData = response.data;
  
      if (!userData) {
        console.error("No data returned from API");
        return;
      }
  
      setEmail(userData.email);
      setUsername(userData.username);
      setAboutMe(userData.about_me);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setCountry(userData.country);
      setAddress(userData.address);
      setCity(userData.city);
      setPostal(userData.pincode);
      setStatename(userData.state);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
         
        </form>
      </div>
    </div>
  );
};

export default PublicProfile;
