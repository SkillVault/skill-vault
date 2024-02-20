import React, { useState, useEffect, useRef } from 'react';
import "./MockInterview.css";
import Webcam from "react-webcam";
import * as tf from '@tensorflow/tfjs';

import * as blazeface from '@tensorflow-models/blazeface';

const MockInterview = () => {
  const webcamRef = useRef(null);
  const [isPersonPresent, setIsPersonPresent] = useState(true);

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user",
  };

  const detectPerson = async () => {
    const model = await blazeface.load();
    const video = webcamRef.current.video;

    if (video.readyState === 4) {
      const predictions = await model.estimateFaces(video, false);

      if (predictions.length === 0) {
        setIsPersonPresent(false);
        console.log(
          "not found"
        )
      } else {
        setIsPersonPresent(true);
        console.log(
          "found"
        )
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectPerson();
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
            <img src="./src/assets/mic.png" alt="mic" />
            <img src="./src/assets/stop.png" alt="stop" />
          </div>
        </div>

        <Webcam
          ref={webcamRef}
          audio={false}
          height={300}
          id="video-player"
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
        />

{!isPersonPresent && (
  <div className="alert">
    <strong>Error: </strong>You are not in the camera view.
  </div>
)}

      </div>
    </div>
  );
};

export default MockInterview;
