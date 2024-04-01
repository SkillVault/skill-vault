import React, { useState,useEffect } from "react";
import "./ProfileForm.css";
import axios from "axios";

const ProfileForm = ({ onFormSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const storedUserSub = localStorage.getItem("userSub");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [aboutMe, setAboutMe] = useState();
  const [email,setEmail] = useState("");
  const [usrname,setUserName] = useState("");


  const fetchUsrProfile = async ()=> {
    const response = await axios.get(`http://localhost:8000/api/user/get_user?user_sub=${storedUserSub}`);
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
    

  }

  useEffect(() => {
    fetchUsrProfile()
  }, []);

  const params = {
    'user_sub': storedUserSub,
    'first_name': firstName,
    'last_name': lastName,
    'country': country,
    'state': state,
    'city': city,
    'postal_code': postalCode,
    'about': aboutMe,
    'address': address,
  };

  const queryString = new URLSearchParams(params).toString();

  const UpdateUsrProfile = async () => {
    try {
      const response = await axios.put(
        `https://skillvault-backend.onrender.com/api/user/update_user/?${queryString}`,params
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    await UpdateUsrProfile();
    console.log(firstName);
    console.log(address);
    console.log("Form Submitted");
    onFormSubmit();
  };

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
              <input
                type="text"
                name="username"
                placeholder="Username123"
                className="form-input"
                value={usrname}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="email">Email Address :</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="example@xyz.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="first-name">First Name :</label>
              <br />
              <input
                type="text"
                placeholder="First Name"
                className="form-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="last-name">Last Name :</label>
              <br />
              <input
                type="text"
                placeholder="Last Name"
                className="form-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </section>
          <hr />
          <h4>CONTACT INFORMATION</h4>
          <section className="contact-information-grid">
            <div className="data-field">
              <label htmlFor="1staddress"> Address Line 1:</label>
              <br />
              <input
                type="text"
                name="first address"
                placeholder="House No. , Street Name "
                className="form-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="country">Country :</label>
              <br />
              <input
                type="text"
                name="country"
                placeholder="Country Name"
                className="form-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="state">State :</label>
              <br />
              <input
                type="text"
                name="state"
                placeholder="State Name"
                className="form-input"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="city">City :</label>
              <br />
              <input
                type="text"
                name="city"
                placeholder="City Name"
                className="form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <input
                type="number"
                name="postal-code"
                placeholder="000000"
                maxLength={6}
                className="form-input"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </section>
          <hr />
          <h4>ABOUT ME</h4>
          <section className="about-information-grid">
            <div className="data-field">
              <label htmlFor="about-me">About Me: :</label>
              <br />
              <textarea
                name="about-me"
                cols="50"
                rows="10"
                placeholder="I am ......."
                className="form-input"
                value={aboutMe} // Bind the value of the textarea to the state
                onChange={handleAboutMeChange} // Handle changes in the textarea
              ></textarea>
            </div>
          </section>
          <div className="change-button">
            <input type="submit" value="Submit" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
