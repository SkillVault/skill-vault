import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddJob.css';
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();
  const storedCompanyName = localStorage.getItem('companyName');
  const [job, setJob] = useState([]);
  const [response, setResponseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  const fetchResponse = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/company/responses`);
      setResponseList(response.data);
    } catch (error) {
      console.error('Error fetching response data:', error);
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
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deletePost = async (jobId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/company/delete-job?job_id=${jobId}`);
      fetchJobs(); // Refetch the updated job list after deletion
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const countResponsesByJobTitle = (jobTitle) => {
    return response.filter((item) => item.job_title === jobTitle).length;
  };

  // Filter job list based on the search term
  const filteredJobs = job.filter((job) =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="addjob">
      <div className="sidebar">
        <CompanyDashboard />
      </div>

      <div className="heading1">
        <div className="search1">
          <MagnifyingGlass size={22} />
          <input
            placeholder="Search by Job Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          />
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
          <h2 style={{ color: 'black' }}>Recent Job Postings</h2>
          <button onClick={() => navigate('/jobentry')}>ADD JOB</button>
        </div>
        <table>
          <thead>
            <tr className="first1">
              <th>Job Title</th>
              <th>Category</th>
              <th>Opening</th>
              <th>Applications</th>
              <th></th> {/* Keep the column title as "Status" */}
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.job_title}</td>
                <td>{job.category}</td>
                <td>{job.openings}</td>
                <td> {countResponsesByJobTitle(job.job_title)} responses</td>
                <td>
                  {/* Directly place the Remove Job button here */}
                  <button className="remove" onClick={() => deletePost(job.jobid)}>
                    Remove Job
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddJob;
