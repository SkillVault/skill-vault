import React, { useState } from 'react';
import "./CompLanding.css";
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";

const CompLanding = () => {
  const [jobData, setJobData] = useState([
    {
      jobTitle: "Frontend Developer",
      category: "Full Time",
      opening: 14,
      application: 3,
      status: "Activate"
    },
    // Add more job data objects as needed
  ]);

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
        <h1>Sample Company</h1>
        <div className="titleimg">
          <img src="./src/assets/dashtitle_img.png" alt="" srcSet="" />
        </div>
      </div>

      <div className="tablee">
        <h2>Recent Job Postings</h2>
        <table>
          <thead>
            <tr className='first'>
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
