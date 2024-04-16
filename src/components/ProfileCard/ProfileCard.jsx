import React, { useState,useEffect } from 'react'
import "./ProfileCard.css"
import axios from "axios";


const ProfileCard = () => {

  const storedUserEmail = localStorage.getItem("userEmail");
  const [profImg, setProfImg] = useState();
 
  const [skill, setSkill] = useState(0);
  const [experience, setExperience] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [name, setName] = useState("");
  const [address,setAddress]=useState("");
  const [job, setJob] = useState("Fresher");

  const fetchUsrProfile = async ()=> {
    const response = await axios.get(`https://skillvault-backend.onrender.com/api/user/get_user?user_mail=${storedUserEmail}`);
    const userData = response.data;
    console.log(userData);
   setProfImg(userData.profile_url);
   console.log(profImg)
   setName(response.data.user_name)
   setAddress(response.data.address)
    

  }

  

  const shareProfile = () => {
    const profileUrl = window.location.href; // Get current profile URL
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert('Profile URL copied to clipboard!');
    }, (err) => {
      console.error('Could not copy profile URL: ', err);
    });
  }

  useEffect(() => {
    fetchUsrProfile()
  }, []);

  return (
        <div className='cards'>
          <div className='card'>
            <img src={profImg} alt="" />
            <div className='outside'>
              <div className="inside">
                <div className='i'>
                  <p>{skill}</p> 
                </div>
                <p>Skills</p>
              </div>
              <div className="inside">
                <div className='i1'>
                  <p>{experience}</p> 
                </div>
                <p>Experience</p>
              </div>
              <div className="inside">
                <div className='i2'>
                  <p>{recommendation}</p> 
                </div> 
                <p>Recommendations</p>
              </div>
            </div>
            <div className="name">
              <h3>{name}</h3>
            </div>
            <div className="address">
              <p>{address}</p>
            </div>
            <div className="job">
              <p>{job}</p>
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