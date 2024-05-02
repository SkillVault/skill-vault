import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import axios from "axios";

const ProfileCard = () => {
  const storedUserEmail = localStorage.getItem("userEmail");
  const [profImg, setProfImg] = useState("");

  const [skill, setSkill] = useState(0);
  const [experience, setExperience] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("Fresher");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/get_user?email=${storedUserEmail}`
    );
    const userData = response.data;
    console.log(userData);
    setProfImg(userData.photo);
    console.log(profImg);
    setName(response.data.username);
    setAddress(response.data.address.first_line);
    setJob(userData.job_role);
    setExperience(userData.experience);
  };

  const shareProfile = () => {
    const profileUrl = window.location.href; // Get current profile URL
    navigator.clipboard.writeText(profileUrl).then(
      () => {
        alert("Profile URL copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy profile URL: ", err);
      }
    );
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  return (
    <div className="cards">
      <div className="card">
        <img
          src={
            profImg ??
            "https://img.freepik.com/premium-vector/people-profile-graphic_24911-21369.jpg?size=626&ext=jpg&ga=GA1.1.1806880798.1713429743&semt=ais"
          }
          alt=""
        />
        <div className="outside">
          <div className="inside">
            <div className="i">
              <p>{skill}</p>
            </div>
            <p>Skills</p>
          </div>
          <div className="inside">
            <div className="i1">
              <p>{experience}</p>
            </div>
            <p>Experience</p>
          </div>
        </div>
        <div className="name">
          <h3>{name}</h3>
        </div>
        <div className="address">
          <p>{address}</p>
        </div>
        <div className="job">
          <p
            style={{
              margin: "0px",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              marginBottom: "0px",
            }}
          >
            {job}
          </p>
        </div>
        <div className="button">
          <button>Show Resume</button>
        </div>
        {/* <button onClick={shareProfile}>Share Profile</button> */}
      </div>
    </div>
  );
};

export default ProfileCard;
