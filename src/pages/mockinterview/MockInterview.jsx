import React, { useState, useEffect, useRef } from "react";
import "./MockInterview.css";
import Webcam from "react-webcam";
import axios from "axios";
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
tf.setBackend('webgl').then(() => {
  console.log('Backend set to WebGL');
}).catch(() => {
  tf.setBackend('cpu').then(() => {
    console.log('Fallback: Backend set to CPU');
  });
});

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
  const [headOrientation, setHeadOrientation] = useState(
    "Head is facing forward"
  );

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
      setIsRecording(false);

      mediaRecorder.stop();

      setRecordStopped(true);
    }
    if (speechRecognition) {
      setIsRecording(false);
      speechRecognition.stop();
    }
  };

  const startSpeechRecognition = () => {
    setIsRecording(true);
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

  const checkTextSimilarity = async (transcript, actualAnswer) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/text-similarity/",
        {
          text1: currentQnAns,
          text2: transcript,
        }
      );
      const similarity = response.data.similarity;
      setSimilarity(similarity);
      console.log("Similarity score:", similarity);
      // Here you can decide what to do with the similarity score
    } catch (error) {
      console.error("Failed to compute similarity:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [currentLevel, questionNumber]);

  const questionsPerLevel = 8; // Number of questions per level
  const totalQuestions = 40; // Total number of questions across all levels

  const handleNextQuestion = () => {
    setIsRecording(false);
    stopRecording();

    // Reset transcript for the next question
    setTranscript("");

    // Update question number and level based on the next question's index
    setQuestionNumber((prevQuestionNumber) => {
      const nextQuestionNumber = prevQuestionNumber + 1;

      // If the next question number exceeds the total questions, handle accordingly
      if (nextQuestionNumber > totalQuestions) {
        // You might want to handle this case differently, e.g., show a completion message or restart
        console.log("You have completed all questions.");
        return prevQuestionNumber; // Keep the question number the same to avoid going over the limit
      }

      // Calculate and update level every time the question number increments
      const nextLevel = Math.ceil(nextQuestionNumber / questionsPerLevel);
      setLevel(nextLevel);

      return nextQuestionNumber;
    });

    // Reset time for the next question and restart timer
    setTimeLeft(80);
    setTimerActive(true);
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

  // Assume webcamRef is a reference to your webcam element

  const detectHeadOrientation = async () => {
    const model = await blazeface.load();
    const video = webcamRef.current.video;
  
    if (video.readyState === 4) {
      const predictions = await model.estimateFaces(video, false);
  
      if (predictions.length > 0) {
        const face = predictions[0]; // Focusing on the most prominent face
        const landmarks = face.landmarks;
  
        const leftEye = landmarks[0];
        const rightEye = landmarks[1];
        const nose = landmarks[2];
        const leftEar = landmarks[3];
        const rightEar = landmarks[4];
  
        const horizontalOrientation = detectHorizontalOrientation(leftEye, rightEye, leftEar, rightEar);
        const verticalOrientation = detectVerticalOrientation(nose, leftEye, rightEye);
  
        console.log(`Head Orientation: ${horizontalOrientation}, ${verticalOrientation}`);
      }
      else {
        console.error('Person not detected')
      }
    }
  };
  
  const detectHorizontalOrientation = (leftEye, rightEye, leftEar, rightEar) => {
    const eyeDistance = Math.abs(leftEye[0] - rightEye[0]);
    const earToEarDistance = Math.abs(leftEar[0] - rightEar[0]);
    const tolerance = eyeDistance * 0.05; // Adjust based on testing
  
    // Using both eyes and ears for better accuracy
    if (Math.abs(leftEye[1] - rightEye[1]) < tolerance && Math.abs(leftEar[1] - rightEar[1]) < tolerance) {
      return "Straight";
    } else if (leftEye[1] > rightEye[1]) {
      return "Right";
    } else {
      return "Left";
    }
  };
  
  const detectVerticalOrientation = (nose, leftEye, rightEye) => {
    const eyesMidPoint = (leftEye[1] + rightEye[1]) / 2;
    const noseToEyesDistance = nose[1] - eyesMidPoint;
  
    const tolerance = 10; // Adjust based on testing
  
    if (Math.abs(noseToEyesDistance) < tolerance) {
      return "Straight";
    } else if (noseToEyesDistance > tolerance) {
      return "Down";
    } else {
      return "Up";
    }
  };
  

  


  // Consider using a more specific effect dependency to control the detection frequency
  useEffect(() => {
    const interval = setInterval(() => {
      detectHeadOrientation();
    }, 2000); // check every 5 seconds

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
          <p style={{ margin: 0 }}>Your current level : {currentLevel}</p>
          <h6>React</h6>
        </div>
        <div className="question-container">
          <pre>
            <code>{currentQuestion || "Loading question..."}</code>
          </pre>
        </div>

        <div className="mock-main">
          <div className="mock">
            <img src="./src/assets/timer.png" alt="timer" id="timer" />
            <h2>{formatTime(timeLeft)}</h2>
          </div>
          <div className="audio">
            <button
              id="audio-btn"
              className={`${isRecording ? "recording-animation" : ""}`}
              onClick={startRecording}
            >
              <img
                src="./src/assets/mic.png"
                alt="mic"
                style={{ cursor: "pointer" }}
              />
            </button>

            <button id="audio-btn" onClick={stopRecording}>
              <img
                src="./src/assets/stop.png"
                alt="stop"
                onClick={() => {
                  stopRecording(),
                    checkTextSimilarity(transcript, currentQnAns);
                }}
                style={{ cursor: "pointer" }}
              />
            </button>
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
    </div>
  );
};

export default MockInterview;
