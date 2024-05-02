import { useState } from "react";
import React from 'react'
import Dashboard from "../../components/Dashboard/Dashboard";
import "./Skill.css";
import { useNavigate } from "react-router-dom";



const Skill = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      title: "REACT ",
      description:"Gear up for a React interview",
    },

    {
      title: "HTML",
      description:"HTML Interview: Semantics, Structure, Accessibility.",
    },

    {
      title: "CSS",
      description:"CSS Interview: Layout, Specificity, Best Practices.",
    },

    {
      title: "FLUTTER",
      description:"Flutter Interview: Widgets, State, Design.",
    },
    {
      title: "REACT ",
      description:"Gear up for a React interview",
    },

    {
      title: "HTML",
      description:"HTML Interview: Semantics, Structure, Accessibility.",
    },

    {
      title: "CSS",
      description:"CSS Interview: Layout, Specificity, Best Practices.",
    },

    {
      title: "FLUTTER",
      description:"Flutter Interview: Widgets, State, Design.",
    },
    {
      title: "REACT ",
      description:"Gear up for a React interview",
    },

    {
      title: "HTML",
      description:"HTML Interview: Semantics, Structure, Accessibility.",
    },

    {
      title: "CSS",
      description:"CSS Interview: Layout, Specificity, Best Practices.",
    },

    {
      title: "FLUTTER",
      description:"Flutter Interview: Widgets, State, Design.",
    },
  ]);
  return (
    <div className="int_main">
      <div className="sidebar">
        <Dashboard />
      </div>
      <div className="inside-main">
        <h1>WELCOME TO SKILL SPACE</h1>
      </div>
      <section className="notification_section">
        <h2 style={{ fontFamily: "Verdana, sans-serif" }}>Take Interview</h2>
        <div className="notification_cards">
          {notifications.slice(0, 12 ).map((notification) => (
            <div className="notification_card" key={notification.id}>
              <h4>{notification.title}</h4>
              <p>{notification.description}</p>
              <button
                onClick={()=> navigate("/interviewStart")}
              >
                Take Interview
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Skill