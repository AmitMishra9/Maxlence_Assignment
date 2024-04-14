import React, { useState } from 'react';
import './Profiles.css';
import Navbar from '../../component/Navbar/Navbar';
const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveUserInfo = () => {
    // Handle saving user information
    console.log('Saving user information:', { name, email, phone });
  };

  const handleSavePassword = () => {
    // Handle saving password
    console.log('Saving new password:', newPassword);
  };

  return (
     <>
      <Navbar/>
    <div className="profile-container">
      <div className="profile-image-section">
        {/* Profile image update section */}
        <div className="profile-image-update">
          <h2>Profile Image</h2>
          <div className="image-upload">
            <input type="file" accept="image/*" id="image-upload-input" />
            <label htmlFor="image-upload-input" className="custom-file-upload">
              Choose Image
            </label>
          </div>
        </div>
      </div>
      <div className="user-info-section">
        {/* User information section */}
        <h2>User Information</h2>
        <div className="user-info-fields">
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <button  className='probtn' onClick={handleSaveUserInfo}>Save</button>
      </div>
      <div className="password-section">
        {/* Password update section */}
        <h2>Password Update</h2>
        <div className="password-fields">
          <label>Old Password:</label>
          <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <button  className='probtn'  onClick={handleSavePassword}>Save</button>
      </div>
    </div>
    </>
  );
};

export default Profile;
