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
          <img src="./src/assets/slider1.png" />
        </div>
        <div className='edit'>
          <h2>Hello Bibin this is your profile page</h2>
          <button className='edit-button'>Edit Profile</button>
        </div>
        <div className='cards'>
          <div className='card'>
            <div className='nav'>
              <h4>My Account</h4>
            </div>
            <div className='details'>
              <h4>User information</h4>
            </div>
            <div className='userinfo'>
              <div className='input-wrapper'>
                <h4>Username</h4>
                <p>Bibin Benny</p>
                {/* <input name ='username' type="text" placeholder="Enter your username" /> */}
              </div>
              <div className='input-wrapper'>
                <h4>Email address</h4>
                {/* <input name ='email' type="text" placeholder="Enter your email" /> */}
                <p>abc@gmail.com</p>
              </div>
              <div className='input-wrapper'>
                <h4>First Name</h4>
                {/* <input name ='firstname' type="text" placeholder="Enter your first name" /> */}
                <p>Bibin</p>
              </div>
              <div className='input-wrapper'>
                <h4>Last name</h4>
                {/* <input name ='lastname' type="text" placeholder="Enter your last name" /> */}
                <p>Benny</p>
              </div>
            </div>
            <div className='details'>
              <h4>Contact information</h4>
            </div>
            <div className='contactinfo'>
              <div className='address'>
                <div className='input-wrapper'>
                  <h4>Address</h4>
                  {/* <input name='address' type="text" placeholder="Enter your address" /> */}
                  <p>abc,dsfhaeuhf,fasfa</p>
                </div>
              </div>
              <div className='other-info'>
                <div className='input-wrapper'>
                  <h4>City</h4>
                  {/* <input name='city' type="text" placeholder="Enter your city name" /> */}
                  <p>Kottayam</p>
                </div>
                <div className='input-wrapper'>
                  <h4>Country</h4>
                  {/* <input name='country' type="text" placeholder="Enter your country name" /> */}
                  <p>India</p>
                </div>
                <div className='input-wrapper'>
                  <h4>Postal Code</h4>
                  {/* <input name='postalcode' type="text" placeholder="Enter your postal code" /> */}
                  <p>686603</p>
                </div>
              </div>
            </div>
            <div className='details'>
              <h4>About Me</h4>
            </div>
            <div className='aboutinfo'>
              <div className='input-wrapper'>
                <h4>About Me</h4>
                {/* <input name='address' type="text" placeholder="Enter your address" /> */}
                <p>abc,dsfhaeuhf,fasfa</p>
              </div>
            </div>
          </div>
          <div className='card2'>
            hii
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
