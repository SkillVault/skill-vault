import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MockInterview.css";
import Webcam from "react-webcam";
import axios from "axios";
import * as blazeface from "@tensorflow-models/blazeface"; 


const MockInterview = () => {
  const webcamRef = useRef(null);
  const [results, setResults] = useState([]);
  const [isPersonPresent, setIsPersonPresent] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentLevel, setLevel] = useState(1);
  const [checking,setChecking] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(80);
  const [timerActive, setTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score,setScore] = useState(0)
  const [headOrientation, setHeadOrientation] = useState("Head is facing forward");
  const [isStoped, setRecordStopped] = useState(false);
  const navigate = useNavigate()
  const subject = "react";
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
    setChecking(false)
    setQuestionNumber((prevQuestionNumber) => {
      const nextQuestionNumber = prevQuestionNumber + 1;
      if (nextQuestionNumber <= 5 && score < 3) {
        return nextQuestionNumber;
      } else if (nextQuestionNumber <= 5 && score >= 2) {
        setLevel((prevLevel) => prevLevel + 1);
        setScore(0);
        return 1;
      } else {
        navigate('/results', { state: { result: results, level:currentLevel } });
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
      
      setChecking(true)
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
          const face = predictions[0];
          const landmarks = face.landmarks;
          const leftEye = landmarks[0];
          const rightEye = landmarks[1];
          const leftEar = landmarks[3];
          const rightEar = landmarks[4];
          const nose = landmarks[2];
          const horizontalDistLeft = Math.abs(leftEye[0] - leftEar[0]);
          const horizontalDistRight = Math.abs(rightEye[0] - rightEar[0]);
          const verticalDistUp = (leftEye[1] + rightEye[1]) / 2 - nose[1];
          const verticalDistDown = nose[1] - (leftEye[1] + rightEye[1]) / 2;
          let message = "Head is facing forward";
          if (horizontalDistLeft > horizontalDistRight) {
            message = "Head is turned to the right";
          } else if (horizontalDistRight > horizontalDistLeft) {
            message = "Head is turned to the left";
          }
  
          if (verticalDistUp > 20) {
            message = "Head is tilted up";
          } else if (verticalDistDown > 20) {
            message = "Head is tilted down";
          }
  
          console.log(message);
  
          setIsPersonPresent(true);
        } else {
          setIsPersonPresent(false);
          console.log("No person detected");
        }
      }
    }
  };

  const questionSkip= () =>{
    setTranscript("I dont know")
    checkTextSimilarity();
    handleNextQuestion();
  }  

  useEffect(() => {
    const interval = setInterval(() => {
      detectPerson();
    }, 3000);

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

        <h1>{currentQuestion || "Loading question..."}</h1>

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
                disabled={checking}
                onClick={() => {
                  stopRecording(), checkTextSimilarity(transcript);
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
          <button id="nxt-btn" onClick={questionSkip}>
            Next Question
          </button>

          
        </div>
      </div>
    
    </div>
  );
};

export default MockInterview;