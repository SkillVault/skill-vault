import React, { useState, useEffect, useRef } from "react";
import "./MockInterview.css";
import Webcam from "react-webcam";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

import * as blazeface from "@tensorflow-models/blazeface";
import { FileX } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const MockInterview = () => {
  const webcamRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isPersonPresent, setIsPersonPresent] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQnAns, setCurrentQnAns] = useState("");
  const [currentLevel, setLevel] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(80); // 80 seconds for 01:20
  const [timerActive, setTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState("");
  const [optionA, setoptionA] = useState();
  const [optionB, setoptionB] = useState();
  const [optionC, setoptionC] = useState();
  const [checking,setChecking] = useState(false);
  const [seletedAnswer, setseletedAnswer] = useState();
  const navigate = useNavigate();
  const subject = "react";

  const [headOrientation, setHeadOrientation] = useState(
    "Head is facing forward"
  );
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
    speechRecognition.start();

    speechRecognition.onresult = (event) => {
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
      const response = await axios.get(
        `http://127.0.0.1:8000/api/questions/?subject=${subject}&Level=${currentLevel}`
      );
      setCurrentQuestion(response.data.Question);
    } catch (error) {
      console.error("Failed to fetch question:", error);
      setCurrentQuestion("Failed to load question.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [questionNumber]);

  const handleNextQuestion = () => {
    setIsRecording(false);
    stopRecording();
    setTranscript("");
    setChecking(false);
    setQuestionNumber((prevQuestionNumber) => {
      const nextQuestionNumber = prevQuestionNumber + 1;
      if (nextQuestionNumber <= 5 && score < 3) {
        return nextQuestionNumber;
      } else if (nextQuestionNumber <= 5 && score >= 2) {
        setLevel((prevLevel) => prevLevel + 1);
        setScore(0);
        return 1;
      } else {
        navigate("/results", {
          state: { result: results, level: currentLevel },
        });
      }
    });
    setTimeLeft(80);
    setTimerActive(true);
  };

  useEffect(() => {
    if (results.length > 0) {
      handleNextQuestion();
    }
  }, [results]);

  const checkTextSimilarity = async (transcript) => {
    try {
      setChecking(true);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/text-similarity/check_answer?subject=${subject}`,
        {
          question: currentQuestion,
          answer: transcript,
        }
      );
      console.log(response.data);
      const formattedResponse = {
        question: currentQuestion,
        result: response.data.result,
        correct_answer: response.data.correct_answer,
      };

      if (response.data.result) {
        setScore((prevScore) => prevScore + 1);
      }
      setResults((prevResults) => [...prevResults, formattedResponse]);
    } catch (error) {
      console.error("Failed to compute similarity:", error);
    }
  };

  useEffect(() => {
    let interval = null;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      console.log("Time's up!");
      handleNextQuestion();
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

          if (verticalDistUp > 20) {
            // Threshold for looking up
            message = "Head is tilted up";
          } else if (verticalDistDown > 20) {
            // Threshold for looking down
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
    }, 3000); // check every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mock-screen">
      <div className="mock-container">
        <div className="head">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: 100, height: 100 }}
              src="./src/assets/bluelogo.png"
              alt=""
            />
          </div>
          <h3>Skill Test : React</h3>
          <p style={{ margin: 0 }}>Your current level : {currentLevel}</p>
        </div>
        {currentLevel > 5 ? (
          <div className="multiple-choice">
            <div className="question">
              <pre>
                <code>{currentQuestion || "Loading question..."}</code>
              </pre>
            </div>
            <div className="options">
              <div className="options">
                <div className="option-card">
                  <input
                    type="Radio"
                    name="Optionn"
                    value={optionA}
                    onChange={(e) => setseletedAnswer(e.target.value)}
                  />
                  <h6>{optionA}</h6>
                </div>
                <div className="option-card">
                  <input
                    type="Radio"
                    name="Optionn"
                    value={optionB}
                    onChange={(e) => setseletedAnswer(e.target.value)}
                  />
                  <h6>{optionB}</h6>
                </div>
                <div className="option-card">
                  <input
                    type="Radio"
                    name="Optionn"
                    value={optionC}
                    onChange={(e) => setseletedAnswer(e.target.value)}
                  />
                  <h6>{optionC}</h6>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="question">
            <h1>{currentQuestion || "Loading question..."}</h1>
          </div>
        )}

        <div className="mock-main">
          {currentLevel > 5 ? (
            <div></div>
          ) : (
            <div className="mock">
              <img src="./src/assets/timer.png" alt="timer" id="timer" />
              <h2>{formatTime(timeLeft)}</h2>
            </div>
          )}
          {currentLevel > 5 ? (
            <div></div>
          ) : (
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
                    stopRecording(), checkTextSimilarity(transcript);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </button>
            </div>
          )}
          {currentLevel > 5 ? (
            <div></div>
          ) : (
            <div className="transcript_main">
              <p>Transcript:</p>
              <div className="transcript">
                <div className="transcript_inside">{transcript}</div>
              </div>
            </div>
          )}
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
          {currentLevel > 5 ? (
            <button
              style={{ position: "absolute", top: "60" }}
              id="nxt-btn"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              id="nxt-btn"
              style={{ right: "300", top: "60" }}
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
          {currentLevel > 5 ? (
            <div className="multiple-choice-timer">
              <img src="./src/assets/timer.png" alt="timer" id="timer" />
              <h2>{formatTime(timeLeft)}</h2>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
