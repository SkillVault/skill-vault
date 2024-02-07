import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Slider from '../../components/Slider/Slider';
import Notification from '../../components/Notification/Notification';

const Homepage = () => {
    return (
      <div className="homepage-container">
        <div className="sidebar">
          <Dashboard />
        </div>
        <main className="main-content">
          <Slider />
          <Notification />
        </main>
      </div>
    );
  };

export default Homepage;
