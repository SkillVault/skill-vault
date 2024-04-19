import React from 'react'
import { useState } from "react";
import "./Interviewstart.css";
import { useNavigate } from "react-router-dom";
const Interviewstart = () => {
    const navigate = useNavigate();
  return (
    <div className="main_top">
        <div className="top">
            <img src="./src/assets/blue_logo.png" alt="" />
            <h2>REACT</h2>
        </div>
        <div className="instruction">
            <br/><br/><h3>Before You Start</h3>
            <p><b>Pre-Interview Instructions</b><br/>
            <b>Introduction:</b><br/>
            "Welcome and thank you for participating in this interview."<br/>
            "The purpose of this interview is to evaluate your knowledge in the selected subject"<br/>
            <b>Confidentiality:</b><br/>
            "All the information you provide will be kept strictly confidential."<br/>
            "Your responses will be used solely for the purposes of this interview and will not be shared without your consent."<br/>
            <b>Duration:</b><br/>
            "The interview will take approximately 1 hour."<br/>
            <b>Recording:</b><br/>
            "We would like to record this interview for accuracy and reference purposes."<br/>
            "Is it okay with you if we proceed with recording?"<br/>
            <b>Clarifications:</b><br/>
            "If you have any questions about the questions or need any clarification, please feel free to contact us at any time."</p><br/><br/>
            <button
                onClick={()=> navigate("/mockinterview")}
              >
                Start Test
              </button>
        </div>
    </div>

  )
}

export default Interviewstart