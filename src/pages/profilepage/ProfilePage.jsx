import React from 'react'
import LandingNavbar from '../../components/LandingNav/LandingNav';
import "../../components/LandingNav/LandingNav";
import Dashboard from '../../components/Dashboard/Dashboard';
import "./ProfilePage.css"


const ProfilePage = () => {
  return (
      <main className="main-content">
        <div className='cards'>
          <div className='card'>
            <img src="./src/assets/logo.png" />
            <div className='outside'>
              <div className="inside">
                <div className='i'>
                  <p>22</p> 
                </div>
                <p>Skills</p>
              </div>
              <div className="inside">
                <div className='i1'>
                  <p>22</p> 
                </div>
                <p>Experience</p>
              </div>
              <div className="inside">
                <div className='i2'>
                  <p>22</p> 
                </div> 
                <p>Recommendations</p>
              </div>
            </div>
            <div className="name">
              <h3>Bibin Benny</h3>
            </div>
            <div className="address">
              <p>Kottayam,Kerala</p>
            </div>
            <div className="job">
              <p>Btech in Computer Science</p>
            </div>
            <div className="button">
              <button>Show Resume</button>
            </div>
          </div>
        </div>
      </main>

  );
};

export default ProfilePage;
