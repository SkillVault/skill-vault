import React from "react";
import "./MockInterview.css";
import Webcam from "react-webcam";

const MockInterview = () => {
  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user",
  };
  return (
    <div className="mock-screen">
      <div className="mock-container">
        <h1>1.What is React ?</h1>
        <div className="mock-main">
          <div className="mock">
            <img src="./src/assets/timer.png" alt="timer" id="timer" />
            <h2>01:20</h2>
          </div>
          <div className="audio">
            <img src="./src/assets/mic.png" alt="" />
            <img src="./src/assets/stop.png" alt="" />
          </div>
        </div>

        <Webcam
          audio={false}
          height={300}
          id="video-player"
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
        />
      </div>
    </div>
  );
};

export default MockInterview;
