import "./ResponseList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import { MagnifyingGlass } from "phosphor-react";

const ResponseList = () => {
  const location = useLocation();
  const jobTitle = location.state;
  const storedCompanyName = localStorage.getItem("companyName");

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

  return (
    <div className="responselist">
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
      <div className="rlist">
        <h2>Welcome to Skill Vault </h2>
        <h1>{storedCompanyName}</h1>
      </div>
      <div className="rlist1">
        <p>{jobTitle && jobTitle.jobTitle}</p>
        <div className="rlist_table">
          <table>
            <thead>
              <tr className="rl_table">
                <th>Name</th>
                <th>Public Profile Link</th>
              </tr>
            </thead>
            <tbody>
              {response.map((response, index) => (
                <tr key={index}>
                  <td className="name">{response.userName}</td>
                  <td className="profile">
                    {" "}
                    <a
                      href={response.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {response.link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResponseList;
