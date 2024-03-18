import React, { useState } from 'react';
import "./JobEntry.css";
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from 'react-router-dom';

const JobEntry = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        jobTitle: '',
        skillsRequired: '',
        category: '',
        location: '',
        openings: '',
        salary: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the form data (e.g., send it to backend)
        console.log(formData);
        // Navigate back to the add job page after submission
        navigate("/addjob");
    };

    return (
        <div className="jobentry">
            <div className="sidebar">
                <CompanyDashboard />
            </div>

            <div className="heading2">
                <div className="search2">
                    <MagnifyingGlass size={22} />
                    <input placeholder="Search by Job Title"></input>
                    <button>Search</button>
                </div>
            </div>

            <div className="title2">
                <h2>Welcome to Skill Vault Company Dashboard</h2>
                <h1>Sample Company</h1>
                <div className="titleimg2">
                    <img src="./src/assets/dashtitle_img.png" alt="" />
                </div>
            </div>

            <div className="table2">
                <div className="b1">
                    <h2>Add JOB</h2>
                </div>
                {/* Job Entry Form */}
                <div className="formdiv">
                    <form className="job-entry-form" onSubmit={handleSubmit}>
                        <div className="card-main">
                            <div className="card1">
                                <label>
                                    Job Title:
                                    <input type="text" classNamename="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div className="card1">
                                <label>
                                    Skills Required:
                                    <input type="text" classNamename="skillsRequired" value={formData.skillsRequired} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div className="card1">
                                <label>
                                    Category:
                                    <input type="text" classNamename="category" value={formData.category} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div className="card1">
                                <label>
                                    Location:
                                    <input type="text" classNamename="location" value={formData.location} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div className="card1">
                                <label>
                                    Openings:
                                    <input type="number" classNamename="openings" value={formData.openings} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <div className="card1">
                                <label>
                                    Salary:
                                    <input type="text" classNamename="salary" value={formData.salary} onChange={handleInputChange} required />
                                </label>
                            </div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobEntry;
