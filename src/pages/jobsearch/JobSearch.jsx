import React, { useState, useEffect } from "react";
import "./JobSearch.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Dropdown from "react-bootstrap/Dropdown";
import { MagnifyingGlass } from "phosphor-react";
import JobDetailsCard from "../../components/JobItemCard/JobDetailsCard";

const JobSearch = () => {
  const [jobTitle, setjobTitle] = useState();

  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [filteredJobs, setFilteredJobs] = useState([]); // State to hold filtered jobs

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/get_job`
      );
      console.log(response.data);
      // If the API returns a single job object instead of an array, wrap it in an array
      const jobsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setJobs(jobsData); // Update state with the fetched jobs array
      console.log(jobs.length);
      setFilteredJobs(jobsData);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  // Handler to update the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler to perform the search
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredJobs(jobs); // If the search term is empty, show all jobs
    } else {
      const filtered = jobs.filter((job) =>
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="main">
      <div className="sidebar">
        <Dashboard />
      </div>
      <div className="comp">
        <div className="comp-inside">
          <div className="comp-div"></div>
          <img src="./src/assets/logo.png" />
          <h3 className="comp-div-h3">SkillVault</h3>
          <p className="comp-div-p">
            We connect top talents with top companies
          </p>
        </div>

        <div className="comp1-div">
          <button>About</button>
          <h5>Get to know SkillVault jobs:</h5>
          <p>SkillVault fin you best jobs .....</p>
          <p>As you might have already heard about us</p>
          <p>As you might have already heard about us</p>
        </div>

        <div className="comp2-div">
          <div className="comp2-inside">
            <h5>Active Job Opening</h5>
            <div className="button-drop-down">
              <div className="search4">
                <MagnifyingGlass size={22} />
                <input
                  placeholder="Search by Job Title"
                  value={searchTerm}
                  onChange={handleSearchChange} // Update the search term as you type
                ></input>
                <button onClick={handleSearch}>Search</button>
              </div>
              <div className="drop-down-container">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown">
                    Job Sector
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="job-listings">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobDetailsCard
                  key={job.id} // Use a unique identifier from your job object, such as an ID
                  job={job}
                />
              ))
            ) : (
              <p>No jobs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
