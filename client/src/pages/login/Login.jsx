import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/login', formData);
      console.log(response.data);
  
      // Check if login was successful (status code 200)
      if (response.status === 200) {
        Swal.fire('Login successful', '', 'success');
        // Redirect user to the home page or any other desired page
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        Swal.fire('Login failed', message, 'error');
      } else {
        Swal.fire('Login failed', 'An error occurred while logging in', 'error');
      }
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="social-icons">
          <FontAwesomeIcon icon={faGoogle} className="social-icon" />
          <FontAwesomeIcon icon={faGithub} className="social-icon" />
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </div>
        <div className="form-group-log">
          <label>*Email:</label>
          <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleInput} />
        </div>
        <div className="form-group-log">
          <label>*Password:</label>
          <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleInput} />
        </div>
        <div className="form-group-log">
          <a className='forgotpassword' href="/forgot-password">Forgot password?</a>
        </div>
        <button   className='loginbtn' type="submit">Login</button>
        <div className="register-link">
           <Link to="/register">
              Create an account
           </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
