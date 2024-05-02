import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Responses.css";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Responses = () => {
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [job, setJob] = useState([]);
  const [response, setResponseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const storedCompanyEmail = localStorage.getItem("companyEmail");
  const storedCompanyName = localStorage.getItem("companyName");
  const navigate = useNavigate();

  const fetchUsrProfile = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/profile?email=${storedCompanyEmail}`
      );
      const userData = response.data;
      setCompanyEmail(userData.company_email);
      setCompanyName(userData.company_name);
      setWebsite(userData.company_website);
    } catch (error) {
      console.error("Error fetching user profile data:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/company_post?company_email=${storedCompanyName}`
      );
      const jobsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setJob(jobsData);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const fetchResponse = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/responses`
      );
      setResponseList(response.data);
    } catch (error) {
      console.error("Error fetching response data:", error);
    }
  };

  useEffect(() => {
    fetchUsrProfile();
    fetchJobs();
    fetchResponse();
  }, []);

  const countResponsesByJobTitle = (jobTitle) => {
    return response.filter((item) => item.job_title === jobTitle).length;
  };

  // Filter jobs based on the search term
  const filteredJobs = job.filter((jobItem) =>
    jobItem.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="response">
      <div className="sidebar">
        <CompanyDashboard />
      </div>
      <div className="heading">
        <div className="search">
          <MagnifyingGlass size={22} />
          <input
            placeholder="Search by Job Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          />
          <button>Search</button>
        </div>
      </div>
      <div className="resp">
        <h2>Welcome to Skill Vault</h2>
        <h1>{storedCompanyName}</h1>
      </div>
      <div className="resp1">
        <p>RESPONSES</p>
        {filteredJobs.map((jobItem, index) => (
          <div key={index}>
            <div className="data">
              <div
                className="name"
                onClick={() =>
                  navigate("/responseList", {
                    state: { jobTitle: jobItem.job_title },
                  })
                }
              >
                <img src="./src/assets/blue_logo.png" />
                <span className="sp">{jobItem.job_title}</span>
                <span className="sp">
                  {countResponsesByJobTitle(jobItem.job_title)} responses
                </span>
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
};

export default Responses;
