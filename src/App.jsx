
import './App.css'
import { useState , useEffect } from 'react'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(10);

  const [submit, setSubmit] = useState(false);
  const [userData, setUserData] = useState({
    name:"" ,
    lname:"" ,
    age: 0 ,
    submit: false
  });

  useEffect(()=>{
    console.log("Data")
    if(userData.age>40){
      setUserData({...userData, submit:true})
    }
  },[userData.age])
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
