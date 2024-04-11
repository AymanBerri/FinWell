import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userInfoResponse = await axios.get('http://localhost:8000/user-info/', {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUserInfo(userInfoResponse.data);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleEditClick = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setFormData({ ...formData, [field]: userInfo[field] });
  };

  const handleCancelClick = () => {
    setEditMode({
      username: false,
      email: false,
      password: false,
    });
    setFormData({
      username: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (field) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      let requestData = { field, value: formData[field] };
  
      if (field === 'password') {
        requestData = {
          ...requestData,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword,
        };
      }
  
      const response = await axios.put(
        'http://localhost:8000/user-info/',
        requestData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Update UI based on backend response
      setUserInfo({ ...userInfo, [field]: formData[field] });
      setEditMode({ ...editMode, [field]: false });
      if (field === 'password') {
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
      setIsLoading(false);
  
      // Display success message from backend
      handleSnackbarOpen(response.data.message, 'success');
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setIsLoading(false);
    
      // Default error message in case the backend response does not contain an error message
      let errorMessage = 'An error occurred while updating. Please try again later.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    
      handleSnackbarOpen(errorMessage, 'error');
    }
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Profile</h2>
  
      {/* Username */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Username:</p>
        {editMode.username ? (
          <EditField
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onSave={() => handleSave('username')}
            onCancel={handleCancelClick}
            isLoading={isLoading}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '20px', flex: '1' }}>{userInfo.username}</p>
            <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={() => handleEditClick('username')}>Edit</button>
          </div>
        )}
      </div>
  
      {/* Email */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email:</p>
        {editMode.email ? (
          <EditField
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onSave={() => handleSave('email')}
            onCancel={handleCancelClick}
            isLoading={isLoading}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '20px', flex: '1' }}>{userInfo.email}</p>
            <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={() => handleEditClick('email')}>Edit</button>
          </div>
        )}
      </div>
  
      {/* Password */}
      {/* handled in backend better?:
      formData.newPassword !== formData.confirmNewPassword || */}
      <div>
        <button style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', marginBottom: '10px' }} onClick={() => handleEditClick('password')}>Change Password</button>
        {editMode.password && (
          <div>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px' }}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px' }}
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px' }}
            />
            <div>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword || isLoading) ? '#cccccc' : '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '10px',
                  cursor: (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword ||  isLoading) ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleSave('password')}
                disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword ||  isLoading}
              >
                Save
              </button>
              <button style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }} onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const EditField = ({ name, value, onChange, onSave, onCancel, isLoading }) => (
  <div>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={{
        marginBottom: '10px',
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        borderColor: '#ccc',
        borderWidth: '1px',
      }}
    />
    <button
      onClick={onSave}
      disabled={!value.trim() || isLoading}
      style={{
        padding: '8px 16px',
        backgroundColor: !value.trim() || isLoading ? '#cccccc' : '#28a745', // Change button color when disabled
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        marginRight: '10px',
        cursor: !value.trim() || isLoading ? 'not-allowed' : 'pointer',
      }}
    >
      Save
    </button>
    <button
      onClick={onCancel}
      disabled={isLoading}
      style={{
        padding: '8px 16px',
        backgroundColor: isLoading ? '#cccccc' : '#dc3545', // Similar style for cancel button for consistency
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
      }}
    >
      Cancel
    </button>
  </div>
);

export default Profile;
