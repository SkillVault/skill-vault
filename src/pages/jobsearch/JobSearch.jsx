import React from "react";
import "./JobSearch.css";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Dropdown from "react-bootstrap/Dropdown";
import { MagnifyingGlass } from "phosphor-react";
import JobCard from "../../components/jobcard/JobCard";

const JobSearch = () => {
  return (
    <div className="job-search-container">
      <div className="sidebar">
        <Dashboard />
      </div>
      <div className="job-search-page">
        <div className="search-bar">
          <div className="search-container">
            <MagnifyingGlass size={22} />
            <input placeholder="Search by Job Title"></input>
            <button>Search</button>
          </div>
          <div className="drop-down-main"></div>
          <div className="drop-down-container">
            <h6>Filter:</h6>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Job Sector
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Job Type
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Skills
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <JobCard />
      </div>
    </div>
  );
};

export default JobSearch;