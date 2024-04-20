import React from 'react'
import "./ResponseList.css"
import CompanyDashboard from '../../components/CompanyDashboard/CompanyDashboard';
import { MagnifyingGlass } from "phosphor-react";

const ResponseList = () => {
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
                <h1>UST GLOBAL</h1>
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
                                <td><input></input></td>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <td><input></input></td>
                                <td><input></input></td>
                            </tr>
                            <tr>
                                <td><input></input></td>
                                <td><input></input></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
      )
}

export default ResponseList