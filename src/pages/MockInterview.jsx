import React, { useState, useEffect, useRef } from "react";
import "./MockInterview.css";
import Webcam from "react-webcam";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

import * as blazeface from "@tensorflow-models/blazeface";

const MockInterview = () => {
  const webcamRef = useRef(null);
  const [isPersonPresent, setIsPersonPresent] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQnAns, setCurrentQnAns] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(80); // 80 seconds for 01:20
  const [timerActive, setTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
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
        `http://localhost:8000/questions/?Q_No=${questionNumber}`
      );
      setCurrentQuestion(response.data.Question); // Assuming the backend sends an object with a Question property
      setCurrentQnAns(response.data.Answer);
      
    } catch (error) {
      console.error("Failed to fetch question:", error);
      setCurrentQuestion("Failed to load question.");
    }
  };

  const checkTextSimilarity = async (transcript, actualAnswer) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/text-similarity/",
        {
          text1: transcript,
          text2: currentQnAns,
        }
      );
      const similarity = response.data.similarity;
      console.log("Similarity score:", similarity);
      // Here you can decide what to do with the similarity score
    } catch (error) {
      console.error("Failed to compute similarity:", error);
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
    setQuestionNumber((prevNumber) => prevNumber + 1);

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
    const model = await blazeface.load();
    const video = webcamRef.current.video;

    if (video.readyState === 4) {
      const predictions = await model.estimateFaces(video, false);

      if (predictions.length === 0) {
        setIsPersonPresent(false);
        console.log("not found");
      } else {
        setIsPersonPresent(true);
        console.log("found");
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
              onClick={()=>{
                stopRecording(),
                checkTextSimilarity(transcript, currentQnAns)
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          {transcript && <p>Transcript: {transcript}</p>}
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
