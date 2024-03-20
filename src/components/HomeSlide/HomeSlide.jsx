import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeSlide.css";

const HomeSlide = () => {
  const storedUserSub = localStorage.getItem("userSub");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [aboutMe, setAboutMe] = useState();
  const [email, setEmail] = useState("");
  const [usrname, setUserName] = useState("");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `https://skillvault-backend.onrender.com/api/user/get_user?user_sub=${storedUserSub}`
    );
    const userData = response.data;
    setEmail(userData.user_mail);
    setUserName(userData.user_name);
    setAboutMe(userData.about);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setCountry(userData.country);
    setAddress(userData.address);
    setCity(userData.city);
    setPostalCode(userData.postal_code);
    setState(userData.state);
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  return (
    <div className="slide-container">
      <div className="slide-image-container">
        <img src="/src/assets/stars.jpg" alt="" />
        <div className="slide-message">
          <h2 style={{ fontSize: "40px" }}>Welcome {email}</h2>
          <p style={{ paddingTop: "10px" }}>
            Connect with Top Employers & Land Your Dream Job
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;
