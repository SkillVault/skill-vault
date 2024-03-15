import React, { useState, useEffect, useRef } from "react";
import "./MockInterview.css";
import Webcam from "react-webcam";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";


import * as blazeface from "@tensorflow-models/blazeface"; 
import { FileX } from "phosphor-react";

const MockInterview = () => {
  const webcamRef = useRef(null);
  const [isPersonPresent, setIsPersonPresent] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQnAns, setCurrentQnAns] = useState("");
  const [currentLevel, setLevel] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(80); // 80 seconds for 01:20
  const [timerActive, setTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [headOrientation, setHeadOrientation] = useState("Head is facing forward");

  const [similarityScore, setSimilarity] = useState("");
  const [isStoped, setRecordStopped] = useState(false);
  let mediaRecorder;
  let audioChunks = [];
  let speechRecognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      setIsRecording(true);
      startSpeechRecognition();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordStopped(true);
    }
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  const startSpeechRecognition = () => {
    speechRecognition.start();

    speechRecognition.onresult = (event) => {
      // Update to accumulate results instead of replacing
      const newTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript((prev) => prev + " " + newTranscript);
    };

    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const fetchQuestion = async () => {
    try {
      // Make sure to use backticks here for the template literal
      const response = await axios.get(
        `http://localhost:8000/api/questions/?Level=${currentLevel}&QNo=${questionNumber}`
      );
      setCurrentQuestion(response.data.Question); // Assuming the backend sends an object with a Question property
      setCurrentQnAns(response.data.Answer);
      setLevel(response.data.Level);
    } catch (error) {
      console.error("Failed to fetch question:", error);
      setCurrentQuestion("Failed to load question.");
    }
  };



  

  useEffect(() => {
    fetchQuestion();
  }, [questionNumber]);

  const handleNextQuestion = () => {
    // Stop recording and speech recognition if they are active
    stopRecording();

    // Reset transcript for the next question
    setTranscript("");

    // Increment question number to fetch the next question
    
      if (questionNumber<8) {
       
        setQuestionNumber((prevNumber) => prevNumber + 1);
       
        
      
    } else {
      setQuestionNumber(1);
      setLevel((prevLevel) => prevLevel + 1);
    }

    // Optionally, reset timer and other states as needed
    setTimeLeft(80); // Reset time for the next question
    setTimerActive(true); // Restart timer for the next question
  };

  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      // Handle what happens when the timer reaches 0
      console.log("Time's up!");
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const videoConstraints = {
    width: 600,
    height: 350,
    facingMode: "user",
  };

 
  const detectPerson = async () => {
    if (webcamRef.current) {
      const video = webcamRef.current.video;
  
      if (video && video.readyState === 4) {
        const model = await blazeface.load();
        const predictions = await model.estimateFaces(video, false);
  
        if (predictions.length > 0) {
          const face = predictions[0]; // Assuming only one face is detected for simplicity
          const landmarks = face.landmarks;
  
          // Calculate the average x position of landmarks on the left and right sides of the face
          const leftEye = landmarks[0];
          const rightEye = landmarks[1];
          const leftEar = landmarks[3];
          const rightEar = landmarks[4];
          const nose = landmarks[2];
  
          // Horizontal movement - comparing the distance between ears and eyes
          const horizontalDistLeft = Math.abs(leftEye[0] - leftEar[0]);
          const horizontalDistRight = Math.abs(rightEye[0] - rightEar[0]);
  
          // Vertical movement - comparing the vertical positions of eyes and nose
          const verticalDistUp = (leftEye[1] + rightEye[1]) / 2 - nose[1];
          const verticalDistDown = nose[1] - (leftEye[1] + rightEye[1]) / 2;
  
          let message = "Head is facing forward";
  
          if (horizontalDistLeft > horizontalDistRight) {
            message = "Head is turned to the right";
          } else if (horizontalDistRight > horizontalDistLeft) {
            message = "Head is turned to the left";
          }
  
          if (verticalDistUp > 20) { // Threshold for looking up
            message = "Head is tilted up";
          } else if (verticalDistDown > 20) { // Threshold for looking down
            message = "Head is tilted down";
          }
  
          console.log(message); // Or handle the message as needed in your UI
  
          setIsPersonPresent(true);
        } else {
          setIsPersonPresent(false);
          console.log("No person detected");
        }
      }
    }
  };
  

  // Consider using a more specific effect dependency to control the detection frequency
  useEffect(() => {
    const interval = setInterval(() => {
      detectPerson();
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mock-screen">
      <div className="mock-container">
        <div className="head">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: 30, height: 30 }}
              src="./src/assets/aim.png"
              alt=""
            />
            <h6>SkillVault</h6>
          </div>
          <h6>React</h6>
        </div>

        <h1>{currentQuestion || "Loading question..."}</h1>

        <div className="mock-main">
          <div className="mock">
            <img src="./src/assets/timer.png" alt="timer" id="timer" />
            <h2>{formatTime(timeLeft)}</h2>
          </div>
          <div className="audio">
            <img
              src="./src/assets/mic.png"
              alt="mic"
              onClick={startRecording}
              style={{ cursor: "pointer" }}
            />

            <img
              src="./src/assets/stop.png"
              alt="stop"
              onClick={() => {
                stopRecording(), checkTextSimilarity(transcript, currentQnAns);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          {<p>Transcript: {transcript}</p>}
        </div>
        <div className="video-div">
          <Webcam
            ref={webcamRef}
            audio={false}
            height={300}
            id="video-player"
            screenshotFormat="image/jpeg"
            width={400}
            videoConstraints={videoConstraints}
          />
          <button id="nxt-btn" onClick={handleNextQuestion}>
            Next Question
          </button>

          {!isPersonPresent && (
            <div className="alert">
              <strong>Error: </strong>You are not in the camera view.
            </div>
          )}
        </div>
      </div>
      <p style={{ margin: 0 }}>Your current level : {currentLevel}</p>
    </div>
  );
};

export default MockInterview;