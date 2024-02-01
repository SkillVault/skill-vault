
import './App.css'
import { useState , useEffect } from 'react'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "landing",
      element: <LandingPage11 />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  
  ]);
  return (
    <>
      <div className="header">
    <input onChange = {(e)=> setUserData({...userData, "name": e.target.value} )} type="text" placeholder='Enter name of you'/>
    <input onChange = {(e)=> setUserData({...userData, "lname": e.target.value} )} type="text" placeholder='Enter last name of you'/>

      <input type="number" onChange = {(e)=>setUserData({...userData, "age": e.target.value} )}    placeholder='Enetr age'/>
      <button > Submit</button>

      <p>
        {
          userData.submit && <>{userData.name} {userData.lname} is {userData.age} years old</>
        }
      </p>
      </div>
    </>
  )
}

export default App
