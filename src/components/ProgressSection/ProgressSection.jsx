import React, { useState, useEffect } from "react";
import "./ProgressSection.css";

const ProgressSection = () => {
  const [uncompletedInterviews, setUncompletedInterviews] = useState([
   
    {
        id: 1,
        title: "Software Engineer Interview",
        company: "Acme Corporation",
        date: "2023-10-27",
        status: "Scheduled",
      },
      {
        id: 1,
        title: "Software Engineer Interview",
        company: "Acme Corporation",
        date: "2023-10-27",
        status: "Scheduled",
      },
      {
        id: 1,
        title: "Software Engineer Interview",
        company: "Acme Corporation",
        date: "2023-10-27",
        status: "Scheduled",
      },
      
  ]);

  // useEffect(() => {
  //   const fetchUncompletedInterviews = async () => {
  //     const response = await fetch("https://api.example.com/notifications");
  //     const data = await response.json();
  //     setUncompletedInterviews(data);
  //   };
  //   fetchUncompletedInterviews();
  // }, []);

  return (
    <section className="notification-section">
      <h2 style={{ fontFamily: "Verdana, sans-serif" }}>
        Continue Your Interview
      </h2>
      {uncompletedInterviews.length > 0 ? (
        <div className="notification-cards">
          {uncompletedInterviews.map((interview) => (
            <div className="notification-card" key={interview.id}>
              <h4>{interview.title}</h4>
              <p>{interview.company}</p>
              <p>{new Date(interview.date).toLocaleDateString()}</p>
              <button
                onClick={() =>
                  console.log(`View details for ${interview.title}`)
                }
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notifications">
          <div className="no-notifications-content">
            <p>No uncompleted interviews yet.</p>
          </div>
        </div>
      )}

      {uncompletedInterviews.length > 5 && (
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

export default ProgressSection;
