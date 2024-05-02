import { React, useState, useEffect } from "react";
import "./Responses.css";
import axios from "axios";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Responses = () => {
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const storedCompanyEmail = localStorage.getItem("companyEmail");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/company/profile?email=${storedCompanyEmail}`
    );
    const userData = response.data;
    console.log(userData);
    setCompanyEmail(userData.company_email);
    setCompanyName(userData.company_name);
    setWebsite(userData.company_website);
  };
  const [job, setJob] = useState([]);
  console.log(job.job_title);
  const storedCompanyName = localStorage.getItem("companyName");
  console.log(storedCompanyName);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/company_post?company_email=${storedCompanyName}`
      );
      console.log(response.data);
      // If the API returns a single job object instead of an array, wrap it in an array
      const jobsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setJob(jobsData);
      console.log(jobsData);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchUsrProfile();
    fetchJobs();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="response">
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
        <h1>{companyName}</h1>
      </div>
      <div className="resp1">
        <p>RESPONSES</p>
          {job.map((jobItem, index) => (
            <div key={index}>
                      <div className="data">

              <div className="name" onClick={() => navigate("/responseList")}>
                <img src="./src/assets/blue_logo.png" />
                <span className="sp">{jobItem.job_title}</span>
                <span className="sp">0 responses</span>
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
