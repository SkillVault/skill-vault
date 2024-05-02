import React, { useState,useEffect } from 'react'
import "./AddJob.css"
import axios from "axios";
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState([]);
    
    const storedCompanyName = localStorage.getItem("companyName");
    console.log(storedCompanyName)

    const [response, setResponseList] = useState([]);
  
  
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
    fetchJobs();
  }, []);

  const deletePost = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/company/delete-job?job_id=${jobId}`
      );
      console.log(response.data);
      // After deleting the job, you might want to refetch the updated job list
      fetchJobs();
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };
  
  
  const countResponsesByJobTitle = (jobTitle) => {
    return response.filter((item) => item.job_title === jobTitle).length;
  };

    // const [jobData, setJobData] = useState([
    //     {
    //       jobTitle: "Frontend Developer",
    //       category: "Full Time",
    //       opening: 14,
    //       application: 3,
    //       status: "Active" // Initially, this holds the job's status
    //     },
    //     // Add more job data objects as needed
    // ]);

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
                <h1>{storedCompanyName}</h1>
                <div className="titleimg1">
                    <img src="./src/assets/dashtitle_img.png" alt="" />
                </div>
            </div>

            <div className="table1">
                <div className="b1"> 
                    <h2 style={{color:"black"}}>Recent Job Postings</h2>
                    <button onClick={()=>navigate("/jobentry")}>ADD JOB</button>
                </div>
                <table>
                    <thead>
                        <tr className='first1'>
                            <th>Job Title</th>
                            <th>Category</th>
                            <th>Opening</th>
                            <th>Applications</th>
                            <th></th> {/* Keep the column title as "Status" */}
                        </tr>
                    </thead>
                    <tbody>
                        {job.map((jobs, index) => (
                            <tr key={index}>
                                <td>{jobs.job_title}</td>
                                <td>{jobs.category}</td>
                                <td>{jobs.openings}</td>
                                <td> {countResponsesByJobTitle(jobs.job_title)} responses</td>
                                <td>
                                    {/* Directly place the Remove Job button here */}
                                    <button className= "remove" onClick={() => deletePost(jobs.jobid)}>Remove Job</button>
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
