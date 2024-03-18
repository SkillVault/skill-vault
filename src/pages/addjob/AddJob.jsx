import React, { useState } from 'react'
import "./AddJob.css"
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const navigate = useNavigate();

    const [jobData, setJobData] = useState([
        {
          jobTitle: "Frontend Developer",
          category: "Full Time",
          opening: 14,
          application: 3,
          status: "Active" // Initially, this holds the job's status
        },
        // Add more job data objects as needed
    ]);

    // Function to remove a job by index
    const removeJob = (indexToRemove) => {
        setJobData(currentJobs => currentJobs.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="addjob">
            <div className="sidebar">
                <CompanyDashboard />
            </div>

            <div className="heading1">
                <div className="search1">
                    <MagnifyingGlass size={22} />
                    <input placeholder="Search by Job Title"></input>
                    <button>Search</button>
                </div>
            </div>

            <div className="title1">
                <h2>Welcome to Skill Vault Company Dashboard</h2>
                <h1>Sample Company</h1>
                <div className="titleimg1">
                    <img src="./src/assets/dashtitle_img.png" alt="" />
                </div>
            </div>

            <div className="table1">
                <div className="b1"> 
                    <h2>Recent Job Postings</h2>
                    <button onClick={()=>navigate("/jobentry")}>ADD JOB</button>
                </div>
                <table>
                    <thead>
                        <tr className='first1'>
                            <th>Job Title</th>
                            <th>Category</th>
                            <th>Opening</th>
                            <th>Applications</th>
                            <th>Status</th> {/* Keep the column title as "Status" */}
                        </tr>
                    </thead>
                    <tbody>
                        {jobData.map((job, index) => (
                            <tr key={index}>
                                <td>{job.jobTitle}</td>
                                <td>{job.category}</td>
                                <td>{job.opening}</td>
                                <td>{job.application}</td>
                                <td>
                                    {/* Directly place the Remove Job button here */}
                                    <button className= "remove" onClick={() => removeJob(index)}>Remove Job</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddJob;
