// src/components/SettingsPage.js
import React, { useState } from 'react';
import { FaUser, FaLock, FaPalette, FaBuilding, FaSave, FaTimes } from 'react-icons/fa';

const RoleManagement = () => {
  // State for all form data
  const [settingsData, setSettingsData] = useState({
    // Profile Section
    fullName: 'Admin',
    email: 'admin@gymapp.com',
    phone: '+91 90000 00000',
    branch: 'All Branches',
    profilePhoto: null, // For file upload

    // Password Section
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',

    // Appearance Section
    theme: 'light', // 'light' or 'dark'
    language: 'english',

    // Gym Details Section
    gymName: 'FitLife Gym',
    gymAddress: '123 Main St, Anytown, USA',
    gymContactEmail: 'contact@fitlife.com',
    gymContactPhone: '+1 555-123-4567',
  });

  // State for showing success message
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  // Generic handler for input changes
  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    
    if (section) {
      // For nested objects like notifications
      setSettingsData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // For top-level properties
      setSettingsData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handler for file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSettingsData(prev => ({
        ...prev,
        profilePhoto: e.target.files[0]
      }));
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
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
                          onChange={(e) => handleInputChange(e)}
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
                          onChange={(e) => handleInputChange(e)}
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
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="branch" className="form-label">Branch</label>
                        <select
                          className="form-select"
                          id="branch"
                          name="branch"
                          value={settingsData.branch}
                          onChange={(e) => handleInputChange(e)}
                        >
                          <option value="All Branches">All Branches</option>
                          <option value="Downtown">Downtown</option>
                          <option value="Uptown">Uptown</option>
                          <option value="Westside">Westside</option>
                        </select>
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
                      onChange={(e) => handleInputChange(e)}
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
                      onChange={(e) => handleInputChange(e)}
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
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Appearance */}
            {/* <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FaPalette className="me-2" /> Appearance
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3" style={{ maxWidth: '600px' }}>
                  <div className="col-12">
                    <label className="form-label">Theme</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="theme"
                          id="lightTheme"
                          value="light"
                          checked={settingsData.theme === 'light'}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <label className="form-check-label" htmlFor="lightTheme">Light</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="theme"
                          id="darkTheme"
                          value="dark"
                          checked={settingsData.theme === 'dark'}
                          onChange={(e) => handleInputChange(e)}
                        />
                        <label className="form-check-label" htmlFor="darkTheme">Dark</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="language" className="form-label">Language</label>
                    <select
                      className="form-select"
                      id="language"
                      name="language"
                      value={settingsData.language}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div> */}

            {/* SECTION 4: Gym Details */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <FaBuilding className="me-2" /> Gym Details
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="gymName" className="form-label">Gym Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gymName"
                      name="gymName"
                      value={settingsData.gymName}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gymContactEmail" className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="gymContactEmail"
                      name="gymContactEmail"
                      value={settingsData.gymContactEmail}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gymContactPhone" className="form-label">Contact Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="gymContactPhone"
                      name="gymContactPhone"
                      value={settingsData.gymContactPhone}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="gymAddress" className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      id="gymAddress"
                      name="gymAddress"
                      rows="3"
                      value={settingsData.gymAddress}
                      onChange={(e) => handleInputChange(e)}
                    ></textarea>
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

export default RoleManagement;