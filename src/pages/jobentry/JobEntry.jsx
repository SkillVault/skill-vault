import React, { useState, useEffect } from "react";
import "./JobEntry.css";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobEntry = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const [website, setWebsite] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [formData, setFormData] = useState({
    jobTitle: "",
    skillsRequired: "",
    category: "",
    location: "",
    openings: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob();
    // Process the form data (e.g., send it to backend)
    console.log(formData);
    // Navigate back to the add job page after submission
    navigate("/addjob");
  };

  const params = {
    job_title: formData.jobTitle,
    category: formData.category,
    location: formData.location,
    openings: formData.openings,
    salary: formData.salary,
    skills: formData.skillsRequired,
    companyname: companyName, // This seems to be missing
    website: website, // This seems to be missing
    companyemail: companyEmail, // This seems to be missing
 
  };
  
  const queryString = new URLSearchParams(params).toString();

  const addJob = async () => {
    try {
      // Make sure to use backticks here for the template literal
      const response = await axios.post(
        `http://127.0.0.1:8000/api/company/add_job/?${queryString}`,
        params
      );
    } catch (error) {
      console.error("Failed to add job:", error);
    }
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
        <h1>{companyName}</h1>
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
              <div className="card5">
                <label>
                  Job Title:
                  <input
                    name="jobTitle"
                    type="text"
                    className="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="card5">
                <label>
                  Skills Required:
                  <input
                    name="skillsRequired"
                    type="text"
                    className="skillsRequired"
                    value={formData.skillsRequired}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="card5">
                <label>
                  Category:
                  <input
                    type="text"
                    name="category"
                    className="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="card5">
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    className="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="card5">
                <label>
                  Openings:
                  <input
                    type="number"
                    name="openings"
                    className="openings"
                    value={formData.openings}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <div className="card5">
                <label>
                  Salary:
                  <input
                    type="text"
                    name="salary"
                    className="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobEntry;
