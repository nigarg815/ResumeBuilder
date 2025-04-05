import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = "http://localhost:5000/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, token, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', name);

       
        setLoginInfo({
          email: '',
          password: ''
        });

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <>
      <div className='form-container'>
        <form onSubmit={handleLogin} className='form-overlays'>
          <h3>Login</h3>
          <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={loginInfo.email}
              autoFocus
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
              value={loginInfo.password}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
        <ToastContainer />
        
      </div>
    </>
  );
}

export default Login;
