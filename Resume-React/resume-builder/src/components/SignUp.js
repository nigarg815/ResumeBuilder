import React, { useState } from 'react';

import './SignUp.css';

import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function SignUp(){
  const [signupInfo,setSignupInfo]=useState({
    username:'',
    email:'',
    password:''
  })

  const navigate=useNavigate();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    console.log(name,value);
    const copySignupInfo={...signupInfo};
    copySignupInfo[name]=value;
    setSignupInfo(copySignupInfo);
  }
  console.log('signupInfo ->',signupInfo);
  const handleSignup=async(e)=>{
    e.preventDefault();
    const {username,email,password}=signupInfo;
    if(!username || !email || !password){
      return handleError("name, email,password are required");
    }
    try{
      const url="http://localhost:5000/signup";
      const response=await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)
      });
      const result=await response.json();
      const {success,message,error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);

    }
    catch(err){
      handleError(err);
    }


  }
  return (
    <>
      {/* <Header /> */}
      <div className='signup-container'>
      <form onSubmit={handleSignup} className='signup-overlays'>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label htmlFor="username">Name :</label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter your name"
            value={signupInfo.username}
            autoFocus
            // onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
          onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={signupInfo.email}
            // onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
          onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={signupInfo.password}
            // onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">sign in?</Link>
        </p>
      </form>
      <ToastContainer/>
      </div>
    </>
  );
};

export default SignUp;
