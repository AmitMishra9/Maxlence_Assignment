import React, { useState, useEffect } from 'react';
import './Users.css';
import Navbar from '../../component/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    // Fetch user data from the backend API
    fetch('http://localhost:8081/api/v1/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // Open the edit popup and set the editing user
  const openEditPopup = user => {
    setEditingUser(user);
    setEditedName(user.fullname);
    setEditedEmail(user.email);
    setIsPopupOpen(true);
  };

  // Close the edit popup
  const closeEditPopup = () => {
    setIsPopupOpen(false);
  };

  // Handle changes in name input
  const handleNameChange = event => {
    setEditedName(event.target.value);
  };

  // Handle changes in email input
  const handleEmailChange = event => {
    setEditedEmail(event.target.value);
  };

  // Handle submit of edited user
  const handleSubmitEdit = () => {
    const updatedUserData = { id: editingUser.id, fullname: editedName, email: editedEmail };

    // Make a PUT request to update the user
    fetch('http://localhost:8081/api/v1/users/updateuserbyid', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
    })
      .then(response => {
        if (response.ok) {
          // Update the user locally after successful update
          const updatedUsers = users.map(user =>
            user.id === editingUser.id ? { ...user, fullname: editedName, email: editedEmail } : user
          );
          setUsers(updatedUsers);
          setIsPopupOpen(false);
        } else {
          throw new Error('Failed to update user');
        }
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <>
      <Navbar />
      <div className="user-component">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn">Search</button>
        </div>
        <Link to='/adduser' className="add-users">Add User</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><img className='user-image' src={user.image} alt="User" /></td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  <Link to='/' className="btn">Delete</Link>  
                  <button onClick={() => openEditPopup(user)} className="btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeEditPopup}>&times;</span>
            <h2>Edit User</h2>
            <label>Name:</label>
            <input type="text" value={editedName} onChange={handleNameChange} />
            <label>Email:</label>
            <input type="email" value={editedEmail} onChange={handleEmailChange} />
            <button className="pop-btn" onClick={handleSubmitEdit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Users;
