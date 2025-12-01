import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaQrcode, FaChevronLeft, FaChevronRight, FaUser, FaClock, FaCalendarAlt, FaSearch, FaFilter, FaFileExport, FaPlus } from 'react-icons/fa';

const ReceptionistQRCode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('view'); // 'view', 'edit', 'add', 'scan'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [scanData, setScanData] = useState({
    member_code: '',
    checkin_time: '',
    checkout_time: '',
    mode: 'QR'
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data - removed device_info field
  const [records, setRecords] = useState([
    {
      id: 1,
      date: "2025-04-05",
      member_name: "Alex Johnson",
      member_code: "MBR-001",
      checkin_time: "06:15",
      checkout_time: "07:45",
      mode: "QR",
      status: "Present"
    },
    {
      id: 2,
      date: "2025-04-05",
      member_name: "Braidy Con",
      member_code: "MBR-002",
      checkin_time: "09:30",
      checkout_time: "10:45",
      mode: "Manual",
      status: "Late"
    },
    {
      id: 3,
      date: "2025-04-05",
      member_name: "Sarah Kim",
      member_code: "MBR-003",
      checkin_time: null,
      checkout_time: null,
      mode: "QR",
      status: "Absent"
    },
    {
      id: 4,
      date: "2025-04-04",
      member_name: "Michael Brown",
      member_code: "MBR-004",
      checkin_time: "05:55",
      checkout_time: "07:30",
      mode: "QR",
      status: "Present"
    },
    {
      id: 5,
      date: "2025-04-04",
      member_name: "Emma Wilson",
      member_code: "MBR-005",
      checkin_time: "08:00",
      checkout_time: "09:15",
      mode: "QR",
      status: "Present"
    },
    {
      id: 6,
      date: "2025-04-03",
      member_name: "David Lee",
      member_code: "MBR-006",
      checkin_time: "07:30",
      checkout_time: "08:45",
      mode: "Manual",
      status: "Late"
    }
  ]);

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  
  // Filter records based on search query
  const filteredRecords = records.filter(record => 
    record.member_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.member_code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Apply pagination to filtered records
  const currentRecords = filteredRecords.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredRecords.length / entriesPerPage);
  
  // Handle entries per page change
  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddNew = () => {
    setModalType('add');
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const handleScanQR = () => {
    setModalType('scan');
    setSelectedRecord(null);
    // Set current time as default check-in time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setScanData({
      member_code: '',
      checkin_time: `${hours}:${minutes}`,
      checkout_time: '',
      mode: 'QR'
    });
    setIsModalOpen(true);
  };

  const handleView = (record) => {
    setModalType('view');
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setModalType('edit');
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      setRecords(prev => prev.filter(r => r.id !== selectedRecord.id));
      alert(`Deleted attendance record for ${selectedRecord.member_name}.`);
    }
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  // Prevent background scroll
  React.useEffect(() => {
    if (isModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isDeleteModalOpen]);

  const getStatusBadge = (status) => {
    const statusColors = {
      Present: { bg: 'bg-success', text: 'text-white' },
      Late: { bg: 'bg-warning', text: 'text-white' },
      Absent: { bg: 'bg-danger', text: 'text-white' }
    };
    
    const color = statusColors[status] || { bg: 'bg-secondary', text: 'text-white' };
    
    return (
      <span className={`badge rounded-pill ${badgeClasses[status] || 'bg-secondary'} px-3 py-1`}>
        {status}
      </span>
    );
  };

  const getModeBadge = (mode) => {
    return (
      <span className={`badge rounded-pill ${
        mode === 'QR' ? 'bg-primary text-white' : 'bg-secondary text-white'
      } px-2 py-1`}>
        {mode}
      </span>
    );
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Attendance Record';
      case 'edit': return 'Edit Attendance Record';
      case 'scan': return 'QR Code Check-in';
      case 'view':
      default: return 'View Attendance Record';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Generate next ID for new record
  const getNextId = () => {
    return records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;
  };

  // Handle QR code scan
  const handleQRScan = () => {
    // In a real app, this would trigger device's camera
    // For demo purposes, we'll simulate a successful scan
    const mockMemberCode = `MBR-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setScanData(prev => ({
      ...prev,
      member_code: mockMemberCode
    }));
    alert(`QR Code scanned successfully: ${mockMemberCode}`);
  };

  // Handle check-in submission
  const handleCheckIn = (actionType) => {
    if (modalType === 'scan') {
      // Find member by code (in a real app, this would be an API call)
      const member = records.find(r => r.member_code === scanData.member_code);
      
      if (!member) {
        alert('Member not found with this QR code!');
        return;
      }

      const newRecord = {
        id: getNextId(),
        date: new Date().toISOString().split('T')[0],
        member_name: member.member_name,
        member_code: scanData.member_code,
        checkin_time: scanData.checkin_time,
        checkout_time: scanData.checkout_time,
        mode: scanData.mode,
        status: scanData.checkin_time ? 'Present' : 'Absent'
      };

      setRecords(prev => [...prev, newRecord]);
      
      if (actionType === 'checkin') {
        alert(`${member.member_name} has been checked in successfully!`);
      } else if (actionType === 'verify') {
        alert(`Attendance verified and recorded for ${member.member_name}!`);
      }
      
      closeModal();
    } else {
      // Handle regular form submission
      if (modalType === 'add') {
        const newRecord = {
          id: getNextId(),
          date: document.querySelector('[name="date"]')?.value || new Date().toISOString().split('T')[0],
          member_name: document.querySelector('[name="member_name"]')?.value || 'Unknown',
          member_code: document.querySelector('[name="member_code"]')?.value || '',
          checkin_time: document.querySelector('[name="checkin_time"]')?.value || null,
          checkout_time: document.querySelector('[name="checkout_time"]')?.value || null,
          mode: document.querySelector('[name="mode"]')?.value || 'Manual',
          status: document.querySelector('[name="status"]')?.value || 'Present'
        };
        setRecords(prev => [...prev, newRecord]);
        alert('New attendance record added successfully!');
      } else if (modalType === 'edit') {
        const updatedRecord = {
          ...selectedRecord,
          date: document.querySelector('[name="date"]')?.value || selectedRecord.date,
          member_name: document.querySelector('[name="member_name"]')?.value || selectedRecord.member_name,
          member_code: document.querySelector('[name="member_code"]')?.value || selectedRecord.member_code,
          checkin_time: document.querySelector('[name="checkin_time"]')?.value || selectedRecord.checkin_time,
          checkout_time: document.querySelector('[name="checkout_time"]')?.value || selectedRecord.checkout_time,
          mode: document.querySelector('[name="mode"]')?.value || selectedRecord.mode,
          status: document.querySelector('[name="status"]')?.value || selectedRecord.status
        };
        setRecords(prev =>
          prev.map(r => r.id === selectedRecord.id ? updatedRecord : r)
        );
        alert('Attendance record updated successfully!');
      }
      closeModal();
    }
  };

  // Attendance Card Component - Modified to put name and edit button on same line
  const AttendanceCard = ({ record }) => (
    <div className="card attendance-card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        {/* Card Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h5 className="card-title mb-1">{record.member_name}</h5>
            <p className="card-text text-muted small mb-0">{record.member_code}</p>
          </div>
          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-secondary action-btn"
              title="View"
              onClick={() => handleView(record)}
            >
              <FaEye size={14} />
            </button>
            <button
              className="btn btn-sm btn-outline-primary action-btn"
              title="Edit"
              onClick={() => handleEdit(record)}
            >
              <FaEdit size={14} />
            </button>
            <button
              className="btn btn-sm btn-outline-danger action-btn"
              title="Delete"
              onClick={() => handleDeleteClick(record)}
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        </div>
        
        {/* Date and Status */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <FaCalendarAlt className="text-primary me-2" />
            <span className="small">{formatDate(record.date)}</span>
          </div>
          {getStatusBadge(record.status)}
        </div>
        
        <div className="time-info">
          <div className="check-time">
            <div className="time-label">Check-in</div>
            <div className="time-value">{record.checkin_time || <span className="no-time">—</span>}</div>
          </div>
          <div className="check-time">
            <div className="time-label">Check-out</div>
            <div className="time-value">{record.checkout_time || <span className="no-time">—</span>}</div>
          </div>
        </div>
        
        {/* Mode and Device */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <FaQrcode className="text-info me-2" />
              <div>
                <small className="text-muted d-block">Mode</small>
                {getModeBadge(record.mode)}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <FaMobileAlt className="text-secondary me-2" />
              <div>
                <small className="text-muted d-block">Device</small>
                <small className="text-truncate d-block" title={record.device_info}>
                  {record.device_info || '—'}
                </small>
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="mt-auto pt-2 border-top">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaUser className="text-primary me-2" />
              <small className="text-muted">ID: {record.id}</small>
            </div>
            <div className="d-flex align-items-center">
              <small className="text-muted me-1">Status:</small>
              {getStatusBadge(record.status)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Calculate statistics
  const presentCount = records.filter(r => r.status === 'Present').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;

  return (
    <div className="attendance-dashboard">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold">QR Code Attendance Records</h2>
          <p className="text-muted mb-0">Track member attendance via QR scan or manual entry.</p>
        </div>
        <div className="header-actions">
          <button className="btn primary-btn" onClick={handleScanQR}>
            <FaQrcode /> <span>Scan QR</span>
          </button>
          <button className="btn text-white" onClick={handleAddNew} style={{backgroundColor: "#6eb2cc"}}>
            <FaPlus /> <span>Manual Entry</span>
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-card present">
          <div className="stat-value">{presentCount}</div>
          <div className="stat-label">Present</div>
        </div>
        <div className="stat-card late">
          <div className="stat-value">{lateCount}</div>
          <div className="stat-label">Late</div>
        </div>
        <div className="stat-card absent">
          <div className="stat-value">{absentCount}</div>
          <div className="stat-label">Absent</div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="search-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by member name or code..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="action-buttons">
          <button className="btn outline-btn">
            <FaFilter /> <span>Filter</span>
          </button>
          <button className="btn outline-btn">
            <FaFileExport /> <span>Export</span>
          </button>
        </div>
      </div>

      {/* Show Entries Dropdown */}
      <div className="entries-control">
        <div className="entries-dropdown">
          <span>Show</span>
          <select 
            value={entriesPerPage}
            onChange={handleEntriesChange}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {currentRecords.length > 0 ? (
          currentRecords.map((record) => (
            <AttendanceCard key={record.id} record={record} />
          ))
        ) : (
          <div className="no-records">
            <p>No attendance records found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="row mt-4">
        <div className="col-12 col-md-5">
          <div className="d-flex align-items-center">
            <span>
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, filteredRecords.length)} of {filteredRecords.length} entries
            </span>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className="d-flex justify-content-md-end justify-content-center mt-2 mt-md-0">
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevPage}>
                    Previous
                  </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(1)}>
                    1
                  </button>
                </li>
                {totalPages > 1 && (
                  <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(2)}>
                      2
                    </button>
                  </li>
                )}
                {totalPages > 2 && (
                  <li className={`page-item ${currentPage === 3 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(3)}>
                      3
                    </button>
                  </li>
                )}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* MAIN MODAL (Add/Edit/View/Scan) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{getModalTitle()}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {modalType === 'scan' ? (
                // QR Scan Modal Content
                <div className="qr-scan-modal">
                  <div className="qr-scan-header">
                    <FaQrcode className="qr-icon" />
                    <h3>Scan Member QR Code</h3>
                    <p>Position QR code within frame to scan</p>
                  </div>

                  <div className="form-group">
                    <label>Member Code <span className="required">*</span></label>
                    <div className="input-with-btn">
                      <input
                        type="text"
                        placeholder="Enter or scan member code"
                        value={scanData.member_code}
                        onChange={(e) => setScanData({...scanData, member_code: e.target.value})}
                        required
                      />
                      <button 
                        className="btn primary-btn"
                        onClick={handleQRScan}
                      >
                        <FaQrcode /> <span>Scan</span>
                      </button>
                    </div>
                  </div>

                    {/* Check-in / Check-out */}
                    <div className="row mb-3 g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Check-in Time</label>
                        <input
                          type="time"
                          className="form-control rounded-3"
                          value={scanData.checkin_time}
                          onChange={(e) => setScanData({...scanData, checkin_time: e.target.value})}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Check-out Time</label>
                        <input
                          type="time"
                          className="form-control rounded-3"
                          value={scanData.checkout_time}
                          onChange={(e) => setScanData({...scanData, checkout_time: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Mode & Device */}
                    <div className="row mb-4 g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Mode</label>
                        <select
                          className="form-select rounded-3"
                          value={scanData.mode}
                          onChange={(e) => setScanData({...scanData, mode: e.target.value})}
                        >
                          <option value="QR">QR</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Device Info</label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          placeholder="e.g., iPhone 14, Admin Dashboard"
                          value={scanData.device_info}
                          onChange={(e) => setScanData({...scanData, device_info: e.target.value})}
                        />
                      </div>
                    </div>

                  <div className="modal-actions">
                    <button className="btn outline-btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button className="btn outline-btn" onClick={() => handleCheckIn('verify')}>
                      Verify and Record
                    </button>
                    <button className="btn primary-btn" onClick={() => handleCheckIn('checkin')}>
                      Mark as Checked-in
                    </button>
                  </div>
                </div>
              ) : (
                // Regular Form Modal Content
                <div className="form-modal">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date <span className="required">*</span></label>
                      <input
                        type="date"
                        defaultValue={selectedRecord?.date || new Date().toISOString().split('T')[0]}
                        readOnly={modalType === 'view'}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Member Name <span className="required">*</span></label>
                      <input
                        type="text"
                        defaultValue={selectedRecord?.member_name || ''}
                        readOnly={modalType === 'view'}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Member Code</label>
                    <input
                      type="text"
                      placeholder="e.g., MBR-001"
                      defaultValue={selectedRecord?.member_code || ''}
                      readOnly={modalType === 'view'}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Check-in Time</label>
                      <input
                        type="time"
                        defaultValue={selectedRecord?.checkin_time || ''}
                        readOnly={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Check-out Time</label>
                      <input
                        type="time"
                        defaultValue={selectedRecord?.checkout_time || ''}
                        readOnly={modalType === 'view'}
                      />
                    </div>
                  </div>

                    {/* Mode & Device */}
                    <div className="row mb-3 g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Mode <span className="text-danger">*</span></label>
                        <select
                          className="form-select rounded-3"
                          defaultValue={selectedRecord?.mode || 'QR'}
                          disabled={modalType === 'view'}
                          required
                        >
                          <option value="QR">QR</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Device Info</label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          placeholder="e.g., iPhone 14, Admin Dashboard"
                          defaultValue={selectedRecord?.device_info || ''}
                          readOnly={modalType === 'view'}
                        />
                      </div>
                    </div>

                  <div className="form-group">
                    <label>Status <span className="required">*</span></label>
                    <select
                      defaultValue={selectedRecord?.status || 'Present'}
                      disabled={modalType === 'view'}
                      required
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>

                  <div className="modal-actions">
                    <button className="btn outline-btn" onClick={closeModal}>
                      Cancel
                    </button>
                    {modalType !== 'view' && (
                      <button className="btn primary-btn" onClick={() => handleCheckIn('save')}>
                        {modalType === 'add' ? 'Add Record' : 'Save Changes'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button className="close-btn" onClick={closeDeleteModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="warning-icon">!</div>
                <h3>Are you sure?</h3>
                <p>
                  This will permanently delete the attendance record for <strong>{selectedRecord?.member_name}</strong> on <strong>{selectedRecord ? formatDate(selectedRecord.date) : ''}</strong>.<br />
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn outline-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="btn danger-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .attendance-dashboard {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f8f9fa;
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* Header Styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .header-info {
          flex: 1;
        }
        
        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 5px 0;
          color: #2c3e50;
        }
        
        .dashboard-subtitle {
          font-size: 16px;
          color: #6c757d;
          margin: 0;
        }
        
        .header-actions {
          display: flex;
          gap: 10px;
        }
        
        /* Button Styles */
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .primary-btn {
          background-color: #6EB2CC;
          color: white;
        }
        
        .primary-btn:hover {
          background-color: #5a9cb8;
        }
        
        .secondary-btn {
          background-color: #6c757d;
          color: white;
        }
        
        .secondary-btn:hover {
          background-color: #5a6268;
        }
        
        .outline-btn {
          background-color: transparent;
          color: #6c757d;
          border: 1px solid #6c757d;
        }
        
        .outline-btn:hover {
          background-color: #f8f9fa;
        }
        
        .danger-btn {
          background-color: #dc3545;
          color: white;
        }
        
        .danger-btn:hover {
          background-color: #c82333;
        }
        
        /* Statistics Section */
        .stats-section {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        
        .stat-card {
          flex: 1;
          min-width: 150px;
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          color: #6c757d;
          text-transform: uppercase;
        }
        
        .present .stat-value {
          color: #28a745;
        }
        
        .late .stat-value {
          color: #ffc107;
        }
        
        .absent .stat-value {
          color: #dc3545;
        }
        
        /* Search & Actions */
        .search-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .search-bar {
          flex: 1;
          min-width: 250px;
          position: relative;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }
        
        .search-bar input {
          width: 100%;
          padding: 10px 15px 10px 40px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          font-size: 14px;
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
        }
        
        /* Entries Control */
        .entries-control {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        
        .entries-dropdown {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        
        .entries-dropdown select {
          padding: 5px 10px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
        }
        
        /* Cards Grid */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .attendance-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .attendance-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 15px;
          border-bottom: 1px solid #f1f3f5;
        }
        
        .employee-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 5px 0;
          color: #2c3e50;
        }
        
        .employee-code {
          font-size: 14px;
          color: #6c757d;
          margin: 0;
        }
        
        .card-actions {
          display: flex;
          gap: 5px;
        }
        
        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .view-btn {
          background-color: #e9ecef;
          color: #495057;
        }
        
        .view-btn:hover {
          background-color: #dee2e6;
        }
        
        .edit-btn {
          background-color: #e9ecef;
          color: #495057;
        }
        
        .edit-btn:hover {
          background-color: #dee2e6;
        }
        
        .delete-btn {
          background-color: #e9ecef;
          color: #495057;
        }
        
        .delete-btn:hover {
          background-color: #f8d7da;
          color: #721c24;
        }
        
        .card-body {
          padding: 15px;
        }
        
        .date-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #495057;
        }
        
        .time-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .check-time {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .time-label {
          font-size: 12px;
          color: #6c757d;
          text-transform: uppercase;
        }
        
        .time-value {
          font-size: 16px;
          font-weight: 600;
        }
        
        .no-time {
          color: #adb5bd;
        }
        
        .mode-device {
          display: flex;
          justify-content: space-between;
        }
        
        .mode, .device {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .mode-label, .device-label {
          font-size: 12px;
          color: #6c757d;
          text-transform: uppercase;
        }
        
        .device-value {
          font-size: 14px;
          color: #495057;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }
        
        .no-records {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .no-records p {
          margin: 0;
          color: #6c757d;
        }
        
        /* Pagination */
        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .pagination-info {
          font-size: 14px;
          color: #6c757d;
        }
        
        .pagination {
          display: flex;
          gap: 5px;
        }
        
        .pagination-btn {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: 1px solid #dee2e6;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .pagination-btn:hover:not(.disabled) {
          background-color: #f8f9fa;
        }
        
        .pagination-btn.active {
          background-color: #6EB2CC;
          color: white;
          border-color: #6EB2CC;
        }
        
        .pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background-color: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #6EB2CC;
          color: white;
        }
        
        .modal-header h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }
        
        .close-btn:hover {
          background-color: rgba(255,255,255,0.2);
        }
        
        .modal-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }
        
        .qr-scan-header {
          text-align: center;
          margin-bottom: 25px;
        }
        
        .qr-icon {
          font-size: 48px;
          color: #6EB2CC;
          margin-bottom: 15px;
        }
        
        .qr-scan-header h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 10px 0;
        }
        
        .qr-scan-header p {
          color: #6c757d;
          margin: 0;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .required {
          color: #dc3545;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .input-with-btn {
          display: flex;
          gap: 10px;
        }
        
        .input-with-btn input {
          flex: 1;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
        }
        
        .form-row .form-group {
          flex: 1;
        }
        
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 25px;
          flex-wrap: wrap;
        }
        
        .delete-modal .modal-body {
          padding: 30px 20px;
        }
        
        .delete-confirmation {
          text-align: center;
        }
        
        .warning-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #f8d7da;
          color: #dc3545;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          margin: 0 auto 20px;
        }
        
        .delete-confirmation h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 15px 0;
        }
        
        .delete-confirmation p {
          color: #6c757d;
          margin: 0;
        }
        
        .modal-footer {
          padding: 15px 20px;
          border-top: 1px solid #f1f3f5;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }
          
          .stats-section {
            flex-direction: column;
          }
          
          .search-actions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .action-buttons {
            justify-content: flex-end;
          }
          
          .cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
          
          .modal-content {
            max-width: 100%;
          }
          
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .modal-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceptionistQRCode;