import React, { useState, useEffect } from "react";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "Software Engineer needed at [Company Name]",
      description:
        "Build scalable and secure web applications in a fast-paced environment. Requires strong knowledge of JavaScript, React, and Node.js.",
      job_id: "[Job ID]",
      company_id: "[Company ID]",
      posted_at: "2023-10-27",
    },

    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },

    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Software Engineer needed at [Company Name]",
      description:
        "Build scalable and secure web applications in a fast-paced environment. Requires strong knowledge of JavaScript, React, and Node.js.",
      job_id: "[Job ID]",
      company_id: "[Company ID]",
      posted_at: "2023-10-27",
    },

    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },

    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
  ]);

  // Simulate retrieving data from a database (replace with your actual API call)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.example.com/notifications");
      const data = await response.json();
      setNotifications(data);
    };
    fetchData();
  }, []);

  return (
    <section className="notification-section">
      <h2 style={{ fontFamily: "Verdana, sans-serif" }}>Latest Job Postings</h2>
      {notifications.length > 0 ? (
        <div className="notification-cards">
          {notifications.slice(0, 5).map((notification) => (
            <div className="notification-card" key={notification.id}>
              <h4>{notification.title}</h4>
              <p>{notification.description}</p>
              <button
                onClick={() => console.log(`Details for ${notification.title}`)}
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
      {notifications.length > 5 && (
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
