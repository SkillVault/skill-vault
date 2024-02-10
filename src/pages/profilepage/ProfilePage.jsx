import React from 'react'
import LandingNavbar from '../../components/LandingNav/LandingNav';
import "../../components/LandingNav/LandingNav";
import Dashboard from '../../components/Dashboard/Dashboard';
import "./ProfilePage.css"

const ProfilePage = () => {
  return (
    <div className="homepage-container">
    <div className="sidebar">
      <Dashboard />
    </div>
    <main className="main-content">
    <div className="profimage">
        <img src="./src/assets/slider1.png" ></img>
    </div>
    <div className='cards'>
      <div className='card'>
        <div className='nav'>
          My Account
        </div>
        <div className='details'>
          hii
        </div>
      </div>
      <div className='card2'>
        hii
      </div>
    </div>

    </main>
  </div>
  )
}

export default ProfilePage;