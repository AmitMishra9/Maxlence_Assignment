import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import './Adduser.css';

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // Get the navigate function

  const handleInput = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname.trim()) {
      Swal.fire('Full name is required', '', 'error');
      return;
    }
    
    try {
      let data = new FormData();
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          data.append(key, formData[key]);
        }
      }

      const response = await axios.post('http://localhost:8081/api/v1/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      Swal.fire('User added successfully', '', 'success');
      
      navigate('/');
    } catch (error) {
      console.error('Failed to add user:', error);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        Swal.fire('Failed to add user', message, 'error');
      } else {
        Swal.fire('Failed to add user', 'An error occurred while adding the user', 'error');
      }
    }
  };

  return (
    <div className="add-user-form-container">
      <div className="login-link">
        <Link to="/home" className='add-btn'>Go Back</Link> 
      </div>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <h2>Add User</h2>
        <div className="form-group">
          <label>Full Name*</label>
          <input type="text" placeholder="Enter your name" name="fullname" value={formData.fullname} onChange={handleInput} />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleInput} />
        </div>
        <div className="form-group">
          <label>Phone*</label>
          <input type="tel" placeholder="Enter your phone number" name="phone" value={formData.phone} onChange={handleInput} />
        </div>
        <div className="form-group">
          <label>Image*</label>
          <input type="file" accept="image/*" name="image" onChange={handleInput} />
        </div>
        <div className="form-group">
          <label>Password*</label>
          <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleInput} />
        </div>
        <div className="form-group">
          <label>Confirm Password*</label>
          <input type="password" placeholder="Confirm your password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInput} />
        </div>
        <button   type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
