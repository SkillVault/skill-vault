import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Slider from '../../components/Slider/Slider';
import Notification from '../../components/Notification/Notification';
import ProgressSection from '../../components/ProgressSection/ProgressSection';
import './Homepage.css'

const Homepage = () => {
    return (
      <div className="homepage-container">
        <div className="sidebar">
          <Dashboard />
        </div>
        <main className="main-content">
          <Slider />
          <div className="notification-progress">
          <hr />
          <Notification />
          <hr />
          <ProgressSection />
          <hr />
          </div>
        </main>
      </div>
    );
  };
export default Homepage;