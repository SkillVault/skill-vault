import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PublicProfile.css";

import axios from "axios";
const PublicProfile = () => {
  const { userId } = useParams();
  const encodedEmail = encodeURIComponent(userId);
  console.log(encodedEmail);

  console.log(`getting user id ${userId}`);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [skillLevel, setSkillLevel] = useState({});
  const [experiance, setExperiance] = useState();

  const [aboutMe, setAboutMe] = useState(
    " Hello! My name is [Your Name] and I am passionate about [Your Passion or Interest].I enjoy [What you enjoy doing] and I am always eager to [What you like to learn or achieve]."
  );
  const [profImg, setProfImg] = useState();

  const [skill, setSkill] = useState(0);
  const [experience, setExperience] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("NA");
  const [job, setJob] = useState("Fresher");

  const fetchUsrProfile = async () => {
    if (!userId) {
      console.log("No userId available");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/get_profile?username=${userId}`
      );
      console.log("API Response:", response); // Log the full response
      const userData = response.data;

      if (!userData) {
        console.error("No data returned from API");
        return;
      }

      console.log(userData);
      setEmail(userData.email);
      setUsername(userData.username);
      setAboutMe(userData.about_me);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setAddress({
        first_line: userData.address.first_line || "",
        country: userData.address.country || "",
        state: userData.address.state || "",
        city: userData.address.city || "",
        pincode: userData.address.pincode || "", // Assuming pincode is a string
      });
      setName(userData.username),
        setProfImg(userData.photo),
        setJob(userData.job),
        setRecommendation(userData.recommendation),
        setSkillLevel({
          react: userData.skills.react || "",
        });
        setCompany(userData.company);
        setExperiance(userData.experience);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  return (
    <div className="form-outer-container1">
      <div className="cards1">
        <div className="card1">
          <img src={profImg} alt="" />
          <div className="name1">
            <h3>{name}</h3>
          </div>
          <div className="address1">
            <p>{address.first_line}</p>
          </div>
          <div className="job1">
            <p>{job}</p>
          </div>
          <div className="outside1">
      
            
            <div className="inside1">
              <div className="i11">
                <p></p>
              </div>
              <p></p>
            </div>
            <div className="inside">
              <div className="i12">
                <p></p>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <div className="form-inner-container1">
        <form action="" method="post">
          <h4>USER INFORMATION</h4>
          <section className="user-information-grid1">
            <div className="data-field1">
              <label htmlFor="username">Username :</label>
              <br />
              <span>{username}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="email">Email Address :</label>
              <br />
              <span>{email}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="first-name">First Name :</label>
              <br />
              <span>{firstName}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="last-name">Last Name :</label>
              <br />
              <span>{lastName}</span>
            </div>
          </section>
          <hr />
          <h4>CONTACT INFORMATION</h4>
          <section className="contact-information-grid1">
            <div className="data-field1">
              <label htmlFor="1staddress">Address Line 1:</label>
              <br />
              <span>{address.first_line}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="country">Country :</label>
              <br />
              <span>{address.country}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="state">State :</label>
              <br />
              <span>{address.state}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="city">City :</label>
              <br />
              <span>{address.city}</span>
            </div>
            <div className="data-field1">
              <label htmlFor="postal-code">Postal Code :</label>
              <br />
              <span>{address.pincode}</span>
            </div>
          </section>
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
              {company === "" ? (
                <span>Not Applicable</span>
              ) : (
                <span>{company}</span>
              )}
            </div>
            <div className="data-field">
              <label htmlFor="country">Skills :</label>
              <br />
              {Object.keys(skillLevel).map((skill, index) => (
                <span key={index}>{`${skill.toUpperCase()}: ${
                  skillLevel[skill]
                }`}</span>
              ))}
            </div>
          </section>
          <hr />
          <hr />
          <h4>ABOUT ME</h4>
          <section className="about-information-grid1">
            <div className="data-field1">
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
