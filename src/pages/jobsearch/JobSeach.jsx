import React from "react";
import "./JobSeach.css";
import 'bootstrap/dist/css/bootstrap.css'; 
import Dashboard from "../../components/Dashboard/Dashboard";
import Dropdown from "react-bootstrap/Dropdown";
import { MagnifyingGlass } from "phosphor-react";
import JobCard from "../../components/jobcard/JobCard";

const JobSeach = () => {
  return (
    <div className='main'>
      <div className="sidebar">
        <Dashboard />
      </div>
      <div className="comp">
        <div className="comp-inside">
          <div className="comp-div">
          </div>
          <img src="./src/assets/logo.png" />
          <h3 className='comp-div-h3'>SkillVault</h3>
          <p className='comp-div-p'>We connect top talents with top companies</p>
        </div>
    
        <div className="comp1-div">
          <button>About</button>
          <h5>Get to know SkillVault jobs:</h5>
          <p >SkillVault fin you best jobs .....</p>
          <p>As you might have already heard about us</p>
          <p>As you might have already heard about us</p>
        </div>

        <div className="comp2-div">
          <div className="comp2-inside">
            <h5>Active Job Opening</h5>
            <div className="button-drop-down">
              <div className="search">
                <MagnifyingGlass size={22} />
                <input placeholder="Search by Job Title"></input>
                <button>Search</button>
              </div>
              <div className="drop-down-container">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown">
                    Job Sector
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="job">
            <img src="./src/assets/logo.png" />
            <div className="spec">
              <h5>Web Designer</h5>
              <p>hfbguf</p>
            </div> 
            <div className="apply">
              <button>Easy Apply</button>
            </div>
          </div>
          <div className="job">
            <img src="./src/assets/logo.png" />
            <div className="spec">
              <h5>Web Designer</h5>
              <p>hfbguf</p>
            </div> 
            <div className="apply">
              <button>Easy Apply</button>
            </div>
          </div>
          <div className="job">
            <img src="./src/assets/logo.png" />
            <div className="spec">
              <h5>Web Designer</h5>
              <p>hfbguf</p>
            </div> 
            <div className="apply">
              <button>Easy Apply</button>
            </div>
          </div>
          <div className="job">
            <img src="./src/assets/logo.png" />
            <div className="spec">
              <h5>Web Designer</h5>
              <p>hfbguf</p>
            </div> 
            <div className="apply">
              <button>Easy Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}
export default JobSeach;
