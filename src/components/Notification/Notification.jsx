import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notification.css";

const Notification = () => {
  const [notification, setNotification] = useState([]); 
 
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `https://skillvault-backend.onrender.com/api/company/get_job`
      );
      console.log(response.data);
      // If the API returns a single job object instead of an array, wrap it in an array
      const jobsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setNotification(jobsData);
      console.log(jobsData)
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="notification-section">
      <h2 style={{ fontFamily: "Verdana, sans-serif" }}>Latest Job Postings</h2>
      {notification.length > 0 ? (
        <div className="notification-cards">
          {notification.map((notification,index) => (
            <div className="notification-card" key={index}>
              <h4>{notification.job_title}</h4>
              <p>{notification.category}</p>
              <button
                onClick={() => console.log(`Details for ${notification.job_title}`)}
              >
                More Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notifications">
          <div className="no-notifications-content">
            <p>No notifications yet.</p>
          </div>
        </div>
      )}
      {notification.length > 5 && (
        <button
          className="view-all-button"
          onClick={() => {
            console.log("Clicked");
          }}
        >
          View All
        </button>
      )}
    </section>
  );
};

export default Notification;
