import React from 'react'
import "./Responses.css"
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";


const Responses = () => {
  const navigate = useNavigate();
  return (
    <div className='response'>
      <div className="sidebar">
        <CompanyDashboard />
      </div>
      <div className="heading">
        <div className="search">
          <MagnifyingGlass size={22} />
          <input placeholder="Search Responses"></input>
          <button>Search</button>
        </div>
      </div>
      <div className="resp">
        <h2>Welcome to Skill Vault </h2>
        <h1>UST GLOBAL</h1>
      </div>
      <div className="resp1">
        <p>RESPONSES</p>
        <div className="data">
          <img src="./src/assets/blue_logo.png" />
          <div className="name"  onClick={()=> navigate("/responseList")}>
            <span className='sp'>Data Scientists</span>
            <span className='sp'>25 responses</span>
          </div>
        </div>
        <br/>
        <div className="data">
          <img src="./src/assets/blue_logo.png" />
          <div className="name">
            <span className='sp'>Data Scientists</span>
            <span className='sp'>25 responses</span>
          </div>
        </div>
        <br/>
        <div className="data">
          <img src="./src/assets/blue_logo.png" />
          <div className="name">
            <span className='sp'>Data Scientists</span>
            <span className='sp'>25 responses</span>
          </div>
        </div>
        <br/>
        <div className="data">
          <img src="./src/assets/blue_logo.png" />
          <div className="name">
            <span className='sp'>Data Scientists</span>
            <span className='sp'>25 responses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Responses