// src/components/SettingsPage.js
import React, { useState } from 'react';
import { FaUser, FaLock, FaSave, FaTimes } from 'react-icons/fa';

const SettingsPage = () => {
  // State for profile photo URL
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('https://randomuser.me/api/portraits/men/46.jpg');
  
  // State for all form data
  const [settingsData, setSettingsData] = useState({
    // Profile Section
    fullName: 'Admin',
    email: 'admin@gymapp.com',
    phone: '+91 90000 00000',
    profilePhoto: null, // For file upload

    // Password Section
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // State for showing success message
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Generic handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setSettingsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Update the form data
      setSettingsData(prev => ({
        ...prev,
        profilePhoto: file
      }));
      
      // Create a URL for the uploaded image to display it
      const imageUrl = URL.createObjectURL(file);
      setProfilePhotoUrl(imageUrl);
    }
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend API
    console.log('Saving settings:', settingsData);
    
    // Show a success message
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="container-fluid p-3 p-md-4">
      {/* Success Message */}
      {showSaveMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Your settings have been saved.
          <button type="button" className="btn-close" onClick={() => setShowSaveMessage(false)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <h1 className="h2 fw-bold mb-4">Settings</h1>
          
          <form onSubmit={handleSubmit}>
            {/* SECTION 1: My Profile */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FaUser className="me-2" /> My Profile
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4 text-center">
                    <img
                      src={profilePhotoUrl}
                      alt="Profile"
                      className="rounded-circle img-fluid mb-3"
                      style={{ maxWidth: '150px' }}
                    />
                    <div>
                      <label htmlFor="profilePhotoUpload" className="btn btn-outline-secondary btn-sm">
                        Change Photo
                      </label>
                      <input
                        type="file"
                        id="profilePhotoUpload"
                        className="d-none"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          value={settingsData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={settingsData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={settingsData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Change Password */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FaLock className="me-2" /> Change Password
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3" style={{ maxWidth: '600px' }}>
                  <div className="col-12">
                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={settingsData.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={settingsData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={settingsData.confirmNewPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-secondary">
                <FaTimes className="me-1" /> Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#6EB2CC', borderColor: '#6EB2CC' }}>
                <FaSave className="me-1" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;