import React, { useState } from "react";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "Software Engineer needed at [Company Name]",
      description:
        "Build scalable and secure web applications in a fast-paced environment. Requires strong knowledge of JavaScript, React, and Node.js.",
      job_id: "[Job ID 1]",
      company_id: "[Company ID]",
      posted_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 2]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 3]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 4]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 5]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 6]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 7]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 8]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
    {
      title: "Application status for [Job Title] updated",
      description:
        "Your application for the [Job Title] position at [Company Name] has been moved to the [New Status] stage.",
      job_id: "[Job ID 9]",
      candidate_id: "[Candidate ID]",
      updated_at: "2023-10-27",
    },
  ]);

  const [showAll, setShowAll] = useState(false);

  const handleClickViewAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="notification-section">
      <h2 style={{ fontFamily: "Verdana, sans-serif" }}>Latest Job Postings</h2>
      {notifications.length > 0 ? (
        <div className="notification-cards">
          {notifications
            .slice(0, showAll ? 8 : 4)
            .map((notification, index) => (
              <div
                className="notification-card"
                key={`${notification.job_id}-${index}`}
              >
                <h4>{notification.title}</h4>
                <p>{notification.description}</p>
                <button
                  onClick={() =>
                    console.log(`Details for ${notification.title}`)
                  }
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
      {notifications.length > 4 && (
        <button className="view-all-button" onClick={handleClickViewAll}>
          {showAll ? "Show Less" : "View All"}
        </button>
      )}
    </section>
  );
};

export default Notification;
