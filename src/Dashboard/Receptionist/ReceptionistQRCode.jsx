import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaQrcode, FaChevronLeft, FaChevronRight, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa';

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
  const [entriesPerPage, setEntriesPerPage] = useState(6); // Changed to 6 for better card layout
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
    setCurrentPage(1); // Reset to first page when entries per page changes
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
    const badgeClasses = {
      Present: "bg-success-subtle text-success-emphasis",
      Late: "bg-warning-subtle text-warning-emphasis",
      Absent: "bg-danger-subtle text-danger-emphasis"
    };
    return (
      <span className={`badge rounded-pill ${badgeClasses[status] || 'bg-secondary'} px-2 py-1`}>
        {status}
      </span>
    );
  };

  const getModeBadge = (mode) => {
    return (
      <span className={`badge rounded-pill ${
        mode === 'QR' ? 'bg-info-subtle text-info-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'
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

  // Attendance Card Component - Removed device info section
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
        
        {/* Check-in/Check-out Times */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <FaClock className="text-success me-2" />
              <div>
                <small className="text-muted d-block">Check-in</small>
                <span className="fw-bold">{record.checkin_time || <span className="text-muted">—</span>}</span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <FaClock className="text-danger me-2" />
              <div>
                <small className="text-muted d-block">Check-out</small>
                <span className="fw-bold">{record.checkout_time || <span className="text-muted">—</span>}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mode only - Removed device info section */}
        <div className="mb-3">
          <div className="d-flex align-items-center">
            <FaQrcode className="text-info me-2" />
            <div>
              <small className="text-muted d-block">Mode</small>
              {getModeBadge(record.mode)}
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

  return (
    <div className="container-fluid p-3 p-md-4">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold fs-4 fs-md-3">QR Code Attendance Records</h2>
          <p className="text-muted mb-0 fs-6">Track member attendance via QR scan or manual entry.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0 d-flex flex-column flex-sm-row gap-2 justify-content-lg-end">
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#6EB2CC',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onClick={handleScanQR}
          >
            <FaQrcode className="me-2" /> <span className="d-none d-sm-inline">Scan QR</span>
          </button>
          <button
            className="btn d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus me-2"></i> <span className="d-none d-sm-inline">Manual Entry</span>
          </button>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="row mb-4 g-3">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control border"
              placeholder="Search by member name or code..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <button className="btn btn-outline-secondary w-100">
            <i className="fas fa-filter me-1"></i> <span className="d-none d-sm-inline">Filter</span>
          </button>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <button className="btn btn-outline-secondary w-100">
            <i className="fas fa-file-export me-1"></i> <span className="d-none d-sm-inline">Export</span>
          </button>
        </div>
      </div>

      {/* Show Entries Dropdown */}
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          <div className="d-flex align-items-center">
            <span className="me-2">Show</span>
            <select 
              className="form-select form-select-sm w-auto" 
              value={entriesPerPage}
              onChange={handleEntriesChange}
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
            <span className="ms-2">entries</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row g-3 g-lg-4">
        {currentRecords.length > 0 ? (
          currentRecords.map((record) => (
            <div key={record.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <AttendanceCard record={record} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <p className="mb-0 text-muted">No attendance records found</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="row mt-4">
        <div className="col-12 col-md-5">
          <div className="d-flex align-items-center">
            <span className="small">
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
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0 pb-0" style={{ backgroundColor: '#6EB2CC', color: 'white' }}>
                <h5 className="modal-title fw-bold">{getModalTitle()}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-4">
                {modalType === 'scan' ? (
                  // QR Scan Modal Content
                  <div>
                    <div className="mb-4 text-center">
                      <div className="mb-3">
                        <FaQrcode size={80} className="text-primary" />
                      </div>
                      <h5>Scan Member QR Code</h5>
                      <p className="text-muted">Position QR code within frame to scan</p>
                    </div>

                    {/* QR Code Input */}
                    <div className="mb-3">
                      <label className="form-label">Member Code <span className="text-danger">*</span></label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control rounded-3"
                          placeholder="Enter or scan member code"
                          value={scanData.member_code}
                          onChange={(e) => setScanData({...scanData, member_code: e.target.value})}
                          required
                        />
                        <button 
                          className="btn btn-outline-secondary rounded-3"
                          type="button"
                          onClick={handleQRScan}
                        >
                          <FaQrcode /> <span className="d-none d-sm-inline ms-1">Scan</span>
                        </button>
                      </div>
                    </div>

                    {/* Check-in / Check-out */}
                    <div className="row mb-4 g-3">
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

                    {/* Mode only - Removed device info */}
                    <div className="mb-4">
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

                    {/* Action Buttons */}
                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 py-2 w-100 w-sm-auto"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary px-4 py-2 w-100 w-sm-auto"
                        onClick={() => handleCheckIn('verify')}
                      >
                        Verify and Record
                      </button>
                      <button
                        type="button"
                        className="btn px-4 py-2 w-100 w-sm-auto"
                        style={{
                          backgroundColor: '#6EB2CC',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontWeight: '500',
                        }}
                        onClick={() => handleCheckIn('checkin')}
                      >
                        Mark as Checked-in
                      </button>
                    </div>
                  </div>
                ) : (
                  // Regular Form Modal Content
                  <form>
                    {/* Date & Member */}
                    <div className="row mb-3 g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Date <span className="text-danger">*</span></label>
                        <input
                          type="date"
                          className="form-control rounded-3"
                          defaultValue={selectedRecord?.date || new Date().toISOString().split('T')[0]}
                          readOnly={modalType === 'view'}
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Member Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          defaultValue={selectedRecord?.member_name || ''}
                          readOnly={modalType === 'view'}
                          required
                        />
                      </div>
                    </div>

                    {/* Member Code */}
                    <div className="mb-3">
                      <label className="form-label">Member Code</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="e.g., MBR-001"
                        defaultValue={selectedRecord?.member_code || ''}
                        readOnly={modalType === 'view'}
                      />
                    </div>

                    {/* Check-in / Check-out */}
                    <div className="row mb-3 g-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label">Check-in Time</label>
                        <input
                          type="time"
                          className="form-control rounded-3"
                          defaultValue={selectedRecord?.checkin_time || ''}
                          readOnly={modalType === 'view'}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Check-out Time</label>
                        <input
                          type="time"
                          className="form-control rounded-3"
                          defaultValue={selectedRecord?.checkout_time || ''}
                          readOnly={modalType === 'view'}
                        />
                      </div>
                    </div>

                    {/* Mode only - Removed device info */}
                    <div className="mb-3">
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

                    {/* Status */}
                    <div className="mb-4">
                      <label className="form-label">Status <span className="text-danger">*</span></label>
                      <select
                        className="form-select rounded-3"
                        defaultValue={selectedRecord?.status || 'Present'}
                        disabled={modalType === 'view'}
                        required
                      >
                        <option value="Present">Present</option>
                        <option value="Late">Late</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4 py-2 w-100 w-sm-auto"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      {modalType !== 'view' && (
                        <button
                          type="button"
                          className="btn px-4 py-2 w-100 w-sm-auto"
                          style={{
                            backgroundColor: '#6EB2CC',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontWeight: '500',
                          }}
                          onClick={() => handleCheckIn('save')}
                        >
                          {modalType === 'add' ? 'Add Record' : 'Save Changes'}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeDeleteModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0 pb-0" style={{ backgroundColor: '#6EB2CC', color: 'white' }}>
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDeleteModal}
                ></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="display-6 text-danger mb-3">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h5>Are you sure?</h5>
                <p className="text-muted">
                  This will permanently delete the attendance record for <strong>{selectedRecord?.member_name}</strong> on <strong>{selectedRecord ? formatDate(selectedRecord.date) : ''}</strong>.<br />
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 w-100 w-sm-auto"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-4 w-100 w-sm-auto"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .action-btn {
          width: 36px;
          height: 36px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .attendance-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
        }
        
        .attendance-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
          .action-btn {
            width: 32px;
            height: 32px;
          }
          
          .modal-dialog {
            max-width: 95%;
            margin: 1rem auto;
          }
        }
        
        @media (max-width: 576px) {
          .modal-dialog {
            margin: 0.5rem;
          }
          .modal-content {
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceptionistQRCode;