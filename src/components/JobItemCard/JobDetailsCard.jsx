import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobDetailsCard.css";

const JobDetailsCard = ({ job }) => {
  const [isEditing, setIsEditing] = useState(false);
  const storedUserEmail = localStorage.getItem("userEmail");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState();
  const [email, setEmail] = useState("");
  const [usrname, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState(0); // Assuming experience is a number
  const [resume, setResume] = useState("");
  const [skills, setSkills] = useState();

  const fetchUsrProfile = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/get_user?email=${storedUserEmail}`
    );
    const userData = response.data;
    console.log(userData);
    setEmail(userData.email);
    setUserName(userData.username);
    setAboutMe(userData.about_me);
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setPhone(userData.phone_number);
    setcompanyDate(userData.companyDate);
    setExperiance(userData.experience);
    setSkills(userData.skills);
    setAddress({
      first_line: userData.address.first_line || "",
      country: userData.address.country || "",
      state: userData.address.state || "",
      city: userData.address.city || "",
      pincode: userData.address.pincode || "", // Assuming pincode is a string
    });
  };

  useEffect(() => {
    fetchUsrProfile();
  }, []);

  const params = {
    userName: usrname,
    link: `http://localhost:5173/public/${usrname}`,
    companyName: job.companyname,
    jobid: job.jobid,
    job_title: job.job_title
  };
  const queryString = new URLSearchParams(params).toString();

  const applyJob = async () => {
    try {
      const response = axios.post(
        `http://127.0.0.1:8000/api/user/apply_job?${queryString}`,
        params
      );
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("apply job failed:", error);
    }
  };
  return (
    <div className="job-details-card">
      <h2 style={{ color: "black", fontSize: 30 }} className="job-title">
        {job.job_title}
      </h2>
      <ul className="job-details">
      <li>
          <strong>Company:</strong> {job.companyname}
        </li>
        <li>
          <strong>website:</strong> {job.website}
        </li>
        <li>
          <strong>Category:</strong> {job.category}
        </li>
        <li>
          <strong>Skills:</strong> {job.skills}
        </li>
        <li>
          <strong>Location:</strong> {job.location}
        </li>
        <li>
          <strong>Openings:</strong> {job.openings}
        </li>
        <li>
          <strong>Salary:</strong> {job.salary}
        </li>
        <li>
          <strong>Closing Date:</strong> {job.closingDate}
        </li>
      </ul>
      <button
        onClick={applyJob}
        style={{ margin: "0px" }}
        className="apply-now-button"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetailsCard;
