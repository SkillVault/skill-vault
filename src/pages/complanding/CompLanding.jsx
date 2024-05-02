import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompLanding.css";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";

const CompLanding = () => {
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const storedCompanyName = localStorage.getItem("companyName");

  const [response, setResponseList] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/company/company_post?company_email=${storedCompanyName}`
      );
      const jobsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setJobData(jobsData);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const storedCompanyEmail = localStorage.getItem("companyEmail");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/company/profile?email=${storedCompanyEmail}`
    );
    const userData = response.data;
    setCompanyEmail(userData.company_email);
    setCompanyName(userData.company_name);
    localStorage.setItem("companyName", userData.company_name);
    setWebsite(userData.company_website);
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

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
    fetchResponse();
  }, []);

  const countResponsesByJobTitle = (jobTitle) => {
    return response.filter((item) => item.job_title === jobTitle).length;
  };

  // Filter job list based on the search term
  const filteredJobData = jobData.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="CompLogin">
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

      <div className="title">
        <h2>Welcome to Skill Vault Company Dashboard</h2>
        <h1>{companyName}</h1>
        <div className="titleimg">
          <img src="./src/assets/dashtitle_img.png" alt="" srcSet="" />
        </div>
      </div>

      <div className="tablee">
        <h2 style={{ color: "black" }}>Recent Job Postings</h2>
        <table>
          <thead>
            <tr className="first">
              <th>Job Title</th>
              <th>Category</th>
              <th>Opening</th>
              <th>Applications</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobData.map((job, index) => (
              <tr key={index}>
                <td>{job.job_title}</td>
                <td>{job.category}</td>
                <td>{job.openings}</td>
                <td> {countResponsesByJobTitle(job.job_title)}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompLanding;
