import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./InterviewResult.css";

const InterviewResult = () => {
  const location = useLocation();
  const { result,level } = location.state;
  const navigate = useNavigate();

  return (
    <div className="result-outer-container">
      <div className="interview-result-container">
        <div className="header-image">
        <p className="header-text">Congratulations! You have achieved Level {level - 1}</p>
        </div>
        <div className="interview-result-card">
          {result.map((question, index) => (
            <div key={index} className="question-container">
              <p className="result_question">{question.question}</p>
              {question.result ? (
                <div className="result-correct">
                  <span className="checkmark">&#10004;</span>
                  Correct
                </div>
              ) : (
                <div className="result-incorrect">
                  <span className="crossmark">&#10060;</span>
                  Incorrect
                  <p className="correct-answer" style={{ color: "black" }}>
                    Correct Answer:
                  </p>
                  <p style={{color:"black"}}>{question.correct_answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="result-continue" onClick={()=>{navigate("/skill")}}>Continue</button>
      </div>
    </div>
  );
};

export default InterviewResult;
