import React from "react";
import "./MockInterview.css";

const MockInterview = () => {
  return (
    <div className="mock-screen">
      <div className="mock-container">
        <h1>1.What is React ?</h1>
        <div className="mock">
        <img src="./src/assets/timer.png" alt="timer" id="timer"/>
        <div className="audio-section">
          <h2>01:20</h2>
          <div className="audio">
            <img src="./src/assets/mic.png" alt="" />
            <img src="./src/assets/stop.png" alt="" />
          </div>
          </div>
        </div>
        <img src="./src/assets/video.png" alt="video player" id="video-player" />
      </div>
    </div>
  );
};

export default MockInterview;
