import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Slider from '../../components/Slider/Slider';
import Notification from '../../components/Notification/Notification';
import ProgressSection from '../../components/ProgressSection/ProgressSection';

const Homepage = () => {
    return (
      <div className="homepage-container">
        <div className="sidebar">
          <Dashboard />
        </div>
        <main className="main-content">
          <Slider />
          <Notification />
          <ProgressSection />
        </main>
      </div>
    );
  };

export default Homepage;
