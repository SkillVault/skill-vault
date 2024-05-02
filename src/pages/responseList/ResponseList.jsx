import "./ResponseList.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";

const ResponseList = () => {

   const fetchResponse = async () => {
    const response = await axios.get(
        `http://127.0.0.1:8000/api/company/responses`
      ); 

   }

    
  return (
        <div className='responselist'>
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
                <h1>CodeCraft</h1>
            </div>
            <div className="rlist1">
                <p>Data Scientists</p>
                <div className="rlist_table">
                    <table>
                        <thead>
                            <tr className='rl_table'>
                                <th>Name</th>
                                <th>Public Profile Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='name'><h1>Name</h1></td>
                                <td className='profile'><h1>Profile link</h1></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
      )
}

export default ResponseList