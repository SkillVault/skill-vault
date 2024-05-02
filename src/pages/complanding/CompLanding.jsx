import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompLanding.css";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";

const CompLanding = () => {
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [jobData, setjobData] = useState([
    {
      jobTitle: "Frontend Developer",
      category: "Full Time",
      opening: 14,
      application: 3,
      status: "Activate",
    },
    // Add more job data objects as needed
  ]);

  const storedCompanyEmail = localStorage.getItem("companyEmail");

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/company/profile?email=${storedCompanyEmail}`
    );
    const userData = response.data;
    console.log(userData);
    setCompanyEmail(userData.company_email);
    setCompanyName(userData.company_name);
    localStorage.setItem("companyName",userData.company_name);
    console.log(userData.company_name);
    setWebsite(userData.company_website);
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  return (
    <div className="CompLogin">
      <div className="sidebar">
        <CompanyDashboard />
      </div>

      <div className="heading">
        <div className="search">
          <MagnifyingGlass size={22} />
          <input placeholder="Search by Job Title"></input>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobData.map((job, index) => (
              <tr key={index}>
                <td>{job.jobTitle}</td>
                <td>{job.category}</td>
                <td>{job.opening}</td>
                <td>{job.application}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompLanding;
