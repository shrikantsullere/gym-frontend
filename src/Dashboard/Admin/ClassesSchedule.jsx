import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaUserPlus, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassesSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'edit', 'view'
  const [selectedClass, setSelectedClass] = useState(null);
  const [memberSearch, setMemberSearch] = useState('');

  // क्लासेस का डेटा - हर क्लास में members ऐरे है जिससे काउंट आता है
  const [classes, setClasses] = useState([
    {
      id: 101,
      class_name: "Strength Training",
      trainer_name: "John Smith",
      date: "2023-06-20",
      time: "10:00 - 11:00",
      schedule_day: "Tuesday",
      status: "Active",
      members: ["Alice", "Bob"]  // यहाँ 2 मेंबर हैं - काउंट = 2
    },
    {
      id: 102,
      class_name: "Cardio & HIIT",
      trainer_name: "Mike Williams",
      date: "2023-06-22",
      time: "14:00 - 15:00",
      schedule_day: "Thursday",
      status: "Active",
      members: ["Charlie"]  // यहाँ 1 मेंबर है - काउंट = 1
    }
  ]);

  const handleAddNew = () => {
    setModalType('add');
    setSelectedClass({ members: [] });  // नई क्लास में 0 मेंबर
    setMemberSearch('');
    setIsModalOpen(true);
  };

  const handleView = (gymClass) => {
    setModalType('view');
    setSelectedClass(gymClass);
    setMemberSearch('');
    setIsModalOpen(true);
  };

  const handleEdit = (gymClass) => {
    setModalType('edit');
    setSelectedClass({ ...gymClass });
    setMemberSearch('');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (gymClass) => {
    setSelectedClass(gymClass);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClass) {
      setClasses(prev => prev.filter(c => c.id !== selectedClass.id));
      alert(`Class "${selectedClass.class_name}" has been deleted.`);
    }
    setIsDeleteModalOpen(false);
    setSelectedClass(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setMemberSearch('');
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedClass(null);
  };

  const getStatusBadge = (status) => {
    const badgeClasses = {
      Active: "bg-success-subtle text-success-emphasis",
      Inactive: "bg-danger-subtle text-danger-emphasis"
    };
    return (
      <span className={`badge rounded-pill ${badgeClasses[status] || 'bg-secondary'} px-3 py-1`}>
        {status}
      </span>
    );
  };

  const getNextClassId = () => {
    const maxId = classes.length > 0 ? Math.max(...classes.map(c => parseInt(c.id))) : 0;
    return `CLASS${String(maxId + 1).padStart(3, '0')}`;
  };

  // मेंबर ऐड करने का फंक्शन - members ऐरे में नाम ऐड होता है
  const addMember = () => {
    if (!memberSearch.trim()) return;
    
    // चेक करें कि मेंबर पहले से है या नहीं
    if (selectedClass?.members?.includes(memberSearch.trim())) {
      alert(`"${memberSearch}" is already in this class.`);
      return;
    }
    
    // members ऐरे में नया मेंबर ऐड करें
    setSelectedClass({
      ...selectedClass,
      members: [...(selectedClass.members || []), memberSearch.trim()]
    });
    setMemberSearch('');
  };

  // मेंबर रिमूव करने का फंक्शन - members ऐरे से नाम हटाता है
  const removeMember = (member) => {
    if (!selectedClass) return;
    setSelectedClass({
      ...selectedClass,
      members: selectedClass.members.filter(m => m !== member)
    });
  };

  const saveClass = () => {
    if (!selectedClass.class_name || !selectedClass.trainer_name) {
      alert("Please fill class name and trainer.");
      return;
    }

    if (modalType === 'add') {
      const newClass = { 
        ...selectedClass, 
        id: getNextClassId(),
        date: selectedClass.date || new Date().toISOString().split('T')[0],
        schedule_day: selectedClass.schedule_day || new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        time: selectedClass.time || "10:00 - 11:00",
        status: selectedClass.status || "Active",
        members: selectedClass.members || []  // मेंबर्स सेव हो रहे हैं
      };
      setClasses(prev => [...prev, newClass]);
      alert('New class added successfully!');
    } else if (modalType === 'edit') {
      setClasses(prev => prev.map(c => c.id === selectedClass.id ? selectedClass : c));
      alert('Class updated successfully!');
    }
    closeModal();
  };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8">
          <h2 className="fw-bold">All Class Scheduled</h2>
          <p className="text-muted mb-0">Manage all gym classes, trainers, and member assignments.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
          <button
            className="btn w-100 w-lg-auto"
            style={{ 
              backgroundColor: '#6EB2CC', 
              color: 'white', 
              borderRadius: '8px', 
              padding: '10px 20px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onClick={handleAddNew}
          >
            <FaUserPlus className="me-2" /> Add Class
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-semibold">CLASS NAME</th>
                <th className="fw-semibold">TRAINER</th>
                <th className="fw-semibold">DATE</th>
                <th className="fw-semibold">TIME</th>
                <th className="fw-semibold">DAY</th>
                <th className="fw-semibold">STATUS</th>
                <th className="fw-semibold">MEMBERS</th>
                <th className="fw-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(c => (
                <tr key={c.id}>
                  <td>{c.class_name}</td>
                  <td>{c.trainer_name}</td>
                  <td>{c.date}</td>
                  <td>{c.time}</td>
                  <td>{c.schedule_day}</td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td>
                    {/* यहाँ मेंबर काउंट आ रहा है members ऐरे की लेंथ से */}
                    {(c.members || []).length > 0 ? (
                      <span className="badge bg-light text-dark">
                        {(c.members || []).length} {(c.members || []).length === 1 ? 'Member' : 'Members'}
                      </span>
                    ) : (
                      <span className="text-muted">No members</span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button 
                        className="btn btn-sm btn-outline-secondary action-btn" 
                        title="View"
                        onClick={() => handleView(c)}
                      >
                        <FaEye size={14} />
                      </button>
                      <button 
                        className="btn btn-sm" 
                        title="Edit"
                        onClick={() => handleEdit(c)}
                        style={{ 
                          borderColor: '#6EB2CC',
                          color: '#6EB2CC'
                        }}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger action-btn" 
                        title="Delete"
                        onClick={() => handleDeleteClick(c)}
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0 pb-0" style={{ backgroundColor: '#6EB2CC', color: 'white' }}>
                <h5 className="modal-title fw-bold">
                  {modalType === 'add' ? 'Add New Class' : modalType === 'edit' ? 'Edit Class' : 'View Class'}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Class Name <span className="text-danger">*</span></label>
                    <input 
                      className="form-control rounded-3" 
                      defaultValue={selectedClass?.class_name || ''} 
                      readOnly={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,class_name:e.target.value})}
                      placeholder="Enter class name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Trainer Name <span className="text-danger">*</span></label>
                    <input 
                      className="form-control rounded-3" 
                      defaultValue={selectedClass?.trainer_name || ''} 
                      readOnly={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,trainer_name:e.target.value})}
                      placeholder="Enter trainer name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Date</label>
                    <input 
                      type="date"
                      className="form-control rounded-3" 
                      defaultValue={selectedClass?.date || ''} 
                      readOnly={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,date:e.target.value})}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Time</label>
                    <input 
                      className="form-control rounded-3" 
                      defaultValue={selectedClass?.time || ''} 
                      readOnly={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,time:e.target.value})}
                      placeholder="e.g., 10:00 - 11:00"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Day</label>
                    <select 
                      className="form-select rounded-3" 
                      defaultValue={selectedClass?.schedule_day || 'Monday'} 
                      disabled={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,schedule_day:e.target.value})}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select 
                      className="form-select rounded-3" 
                      defaultValue={selectedClass?.status || 'Active'} 
                      disabled={modalType==='view'} 
                      onChange={e=>setSelectedClass({...selectedClass,status:e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                {/* Members section */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Members 
                    {modalType !== 'view' && <span className="text-muted ms-2">Add members by typing their name</span>}
                  </label>
                  
                  {modalType === 'view' ? (
                    <div className="border rounded-3 p-3 bg-light">
                      {/* व्यू मोड में मेंबर्स दिखाना */}
                      {(selectedClass?.members || []).length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {(selectedClass?.members || []).map(member => (
                            <span key={member} className="badge bg-light text-dark px-3 py-1">
                              {member}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted mb-0">No members assigned to this class</p>
                      )}
                    </div>
                  ) : (
                    <div className="border rounded-3 p-3 bg-light">
                      <div className="d-flex mb-3">
                        <input
                          type="text"
                          className="form-control rounded-3 me-2"
                          placeholder="Type member name and click Add..."
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addMember()}
                        />
                        <button
                          className="btn btn-primary rounded-3"
                          onClick={addMember}
                        >
                          Add
                        </button>
                      </div>
                      
                      {/* ऐड/एडिट मोड में मेंबर्स काउंट और लिस्ट */}
                      {(selectedClass?.members || []).length > 0 && (
                        <div>
                          <small className="text-muted d-block mb-2">
                            {/* यहाँ भी मेंबर काउंट आ रहा है */}
                            {selectedClass.members.length} member{selectedClass.members.length > 1 ? 's' : ''} in this class:
                          </small>
                          <div className="d-flex flex-wrap gap-2">
                            {(selectedClass?.members || []).map(member => (
                              <span key={member} className="badge bg-light text-dark px-3 py-1 d-flex align-items-center">
                                {member}
                                <FaTimes
                                  className="ms-2"
                                  style={{ cursor: 'pointer', fontSize: '12px' }}
                                  onClick={() => removeMember(member)}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {modalType !== 'view' && (
                  <div className="d-flex justify-content-end mt-4">
                    <button 
                      className="btn btn-outline-secondary me-2 px-4" 
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button 
                      className="btn px-4" 
                      style={{background:'#6EB2CC',color:'white'}} 
                      onClick={saveClass}
                    >
                      {modalType==='add'?'Add Class':'Update Class'}
                    </button>
                  </div>
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
                  This will permanently delete <strong>{selectedClass?.class_name}</strong>.<br />
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-4"
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
          width: 32px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .action-btn {
            width: 28px;
            height: 28px;
          }
        }
        
        /* Ensure modal content is responsive */
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

export default ClassesSchedule;