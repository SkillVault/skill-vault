import React,{useState} from 'react'
import "./ProfileCard.css"


const ProfileCard = () => {
  const [skill, setSkill] = useState(0);
  const [experience, setExperience] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [name, setName] = useState("User");
  const [address,setAddress]=useState("Some Street,Somewhere");
  const [job, setJob] = useState("Fresher");
  return (
        <div className='cards'>
          <div className='card'>
            <img src="./src/assets/logo.png" />
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
          </div>
        </div>

  );
};

export default ProfileCard;