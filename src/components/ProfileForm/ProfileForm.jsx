import React, { useState } from "react";
import "./ProfileForm.css";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onFormSubmit(); // Invoke the onFormSubmit function passed from parent component
    toggleEditing();
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
              <input type="text" name="username" placeholder="Username123" />
            </div>
            <div className="data-field">
              <label htmlFor="email">Email Address :</label>
              <br />
              <input type="email" name="email" placeholder="example@xyz.com" />
            </div>
            <div className="data-field">
              <label htmlFor="first-name">First Name :</label>
              <br />
              <input type="text" placeholder="First Name" />
            </div>
            <div className="data-field">
              <label htmlFor="last-name">Last Name :</label>
              <br />
              <input type="text" placeholder="Last Name" />
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
              />
            </div>
            <div className="data-field">
              <label htmlFor="country">Country :</label>
              <br />
              <input type="text" name="country" placeholder="Country Name" />
            </div>
            <div className="data-field">
              <label htmlFor="state">State :</label>
              <br />
              <input type="text" name="state" placeholder="State Name" />
            </div>
            <div className="data-field">
              <label htmlFor="city">City :</label>
              <br />
              <input type="text" name="city" placeholder="City Name" />
            </div>
            <div className="data-field">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <input
                type="number"
                name="postal-code"
                placeholder="000000"
                maxLength={6}
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
