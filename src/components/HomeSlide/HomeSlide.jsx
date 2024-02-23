import React from "react";
import { useState, useEffect } from "react";
import "./HomeSlide.css";

// const fetchUsername = async () => {
// //Implement your API call or GraphQL query here
//   //Replace with your actual logic for fetching the username from MongoDB
//   const response = await fetch("/api/username");
//   const data = await response.json();
//   return data.username;
// };

const HomeSlide = () => {
  const [username, setUsername] = useState("User Name");

  // useEffect(() => {
  //   const getUsername = async () => {
  //     try {
  //       const fetchedUsername = await fetchUsername();
  //       setUsername(fetchedUsername);
  //     } catch (error) {
  //       console.error("Error fetching username:", error);
  //       // Handle the error appropriately, e.g., display an error message
  //     }
  //   };

  //   getUsername();
  // }, []);

  return (
    <div className="slide-container">
      <div className="slide-image-container">
        <img src="/src/assets/stars.jpg" alt="" />
        <div className="slide-message">
          <h2 style={{ fontSize: "40px" }}>Welcome {username}</h2>
          <p style={{ paddingTop: "10px" }}>
            Connect with Top Employers & Land Your Dream Job
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSlide;
