import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  X,
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Filter
} from "lucide-react";

// Initial members data
const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 234-567-8900",
    email: "john.doe@example.com",
    branch: "Downtown",
    plan: "Premium Annual",
    planStart: "2024-12-15",
    expiry: "2025-12-15",
    status: "Active",
    address: "123 Main St, New York, NY",
    gender: "Male",
    dob: "1985-05-15"
  },
  {
    id: 2,
    name: "Sarah Miller",
    phone: "+1 234-567-8901",
    email: "sarah.miller@example.com",
    branch: "North Branch",
    plan: "Basic Monthly",
    planStart: "2024-01-28",
    expiry: "2025-01-28",
    status: "Expired",
    address: "456 Oak Ave, Los Angeles, CA",
    gender: "Female",
    dob: "1990-08-22"
  },
  {
    id: 3,
    name: "Michael Johnson",
    phone: "+1 234-567-8902",
    email: "michael.j@example.com",
    branch: "Downtown",
    plan: "Standard Quarterly",
    planStart: "2025-01-10",
    expiry: "2025-03-10",
    status: "Frozen",
    address: "789 Pine Rd, Chicago, IL",
    gender: "Male",
    dob: "1982-11-30"
  }
];

const AdminMember = () => {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRenewForm, setShowRenewForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  
  // Form states
  const [newMember, setNewMember] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    plan: "",
    address: "",
    gender: "",
    dob: ""
  });
  
  const [editMember, setEditMember] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    branch: "",
    plan: "",
    address: "",
    gender: "",
    dob: ""
  });
  
  const [renewPlan, setRenewPlan] = useState({
    memberId: "",
    plan: "",
    paymentMode: "cash",
    amountPaid: ""
  });

  // Filter members based on search term and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.phone.includes(searchTerm);
    const matchesStatus = filterStatus === "" || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle add member
  const handleAddMember = (e) => {
    e.preventDefault();
    const id = members.length ? Math.max(...members.map(m => m.id)) + 1 : 1;
    const today = new Date();
    const planStart = today.toISOString().split('T')[0];
    
    // Calculate expiry based on plan
    let expiry = new Date(today);
    if (newMember.plan.includes("Monthly")) {
      expiry.setMonth(expiry.getMonth() + 1);
    } else if (newMember.plan.includes("Quarterly")) {
      expiry.setMonth(expiry.getMonth() + 3);
    } else if (newMember.plan.includes("Annual")) {
      expiry.setFullYear(expiry.getFullYear() + 1);
    }
    
    const member = {
      id,
      ...newMember,
      planStart,
      expiry: expiry.toISOString().split('T')[0],
      status: "Active"
    };
    
    setMembers([...members, member]);
    setNewMember({
      name: "",
      phone: "",
      email: "",
      branch: "",
      plan: "",
      address: "",
      gender: "",
      dob: ""
    });
    setShowAddForm(false);
  };

  // Handle edit member
  const handleEditMember = (e) => {
    e.preventDefault();
    setMembers(members.map(member => 
      member.id === editMember.id ? {...member, ...editMember} : member
    ));
    setShowEditForm(false);
  };

  // Handle delete member
  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  // Handle view member
  const handleViewMember = (member) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  // Handle edit form open
  const handleEditFormOpen = (member) => {
    setEditMember({...member});
    setShowEditForm(true);
  };

  // Handle renew plan
  const handleRenewPlan = (e) => {
    e.preventDefault();
    const today = new Date();
    const planStart = today.toISOString().split('T')[0];
    
    // Calculate expiry based on plan
    let expiry = new Date(today);
    if (renewPlan.plan.includes("Monthly")) {
      expiry.setMonth(expiry.getMonth() + 1);
    } else if (renewPlan.plan.includes("Quarterly")) {
      expiry.setMonth(expiry.getMonth() + 3);
    } else if (renewPlan.plan.includes("Annual")) {
      expiry.setFullYear(expiry.getFullYear() + 1);
    }
    
    setMembers(members.map(member => 
      member.id === parseInt(renewPlan.memberId) 
        ? {
            ...member, 
            plan: renewPlan.plan,
            planStart,
            expiry: expiry.toISOString().split('T')[0],
            status: "Active"
          } 
        : member
    ));
    
    setRenewPlan({
      memberId: "",
      plan: "",
      paymentMode: "cash",
      amountPaid: ""
    });
    setShowRenewForm(false);
  };

  // Handle renew form open
  const handleRenewFormOpen = (member) => {
    setRenewPlan({
      ...renewPlan,
      memberId: member.id.toString(),
      plan: member.plan
    });
    setShowRenewForm(true);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case "Active": return "bg-success";
      case "Expired": return "bg-danger";
      case "Frozen": return "bg-info";
      case "Pending": return "bg-warning";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid py-2 py-md-4">
      {/* Header - Responsive */}
      <div className="row mb-3 mb-md-4 align-items-center">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <h2 className="fw-bold mb-0 text-center text-md-start">Members Management</h2>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex justify-content-center justify-content-md-end">
            <button 
              className="btn text-white w-100 w-md-auto" 
              style={{backgroundColor: "#6EB2CC"}}
              onClick={() => setShowAddForm(true)}
            >
              <UserPlus size={18} className="me-2" />
              <span className="d-none d-sm-inline">Add Member</span>
              <span className="d-sm-none">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter - Responsive */}
      <div className="row mb-3 mb-md-4 g-2 g-md-3">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <select 
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Frozen">Frozen</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Members Table - Responsive */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          {/* Desktop Table View */}
          <div className="d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>Plan</th>
                    <th>Expiry</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map(member => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.phone}</td>
                        <td>{member.email}</td>
                        <td>{member.branch}</td>
                        <td>{member.plan}</td>
                        <td>{new Date(member.expiry).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${getStatusClass(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleViewMember(member)}
                              title="View"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleEditFormOpen(member)}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              className="btn btn-sm"
                              style={{color: "#6EB2CC", borderColor: "#6EB2CC"}}
                              onClick={() => handleRenewFormOpen(member)}
                              title="Renew Plan"
                            >
                              <RefreshCw size={16} />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteMember(member.id)}
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4">No members found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="d-md-none">
            {filteredMembers.length > 0 ? (
              filteredMembers.map(member => (
                <div key={member.id} className="border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1 fw-bold">{member.name}</h6>
                      <span className={`badge ${getStatusClass(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-secondary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleViewMember(member)}
                          >
                            <Eye size={16} className="me-2" /> View
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleEditFormOpen(member)}
                          >
                            <Edit size={16} className="me-2" /> Edit
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleRenewFormOpen(member)}
                          >
                            <RefreshCw size={16} className="me-2" /> Renew
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item text-danger" 
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <Trash2 size={16} className="me-2" /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row g-2 text-sm">
                    <div className="col-6">
                      <strong>Phone:</strong> {member.phone}
                    </div>
                    <div className="col-6">
                      <strong>Branch:</strong> {member.branch}
                    </div>
                    <div className="col-6">
                      <strong>Plan:</strong> {member.plan}
                    </div>
                    <div className="col-6">
                      <strong>Expiry:</strong> {new Date(member.expiry).toLocaleDateString()}
                    </div>
                    <div className="col-12">
                      <strong>Email:</strong> {member.email}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">No members found</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal - Fixed */}
      {showAddForm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Member</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowAddForm(false)}
                ></button>
              </div>
              <div className="modal-body" style={{maxHeight: "70vh", overflowY: "auto"}}>
                <form onSubmit={handleAddMember}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newMember.phone}
                        onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={newMember.email}
                        onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Branch</label>
                      <select 
                        className="form-select" 
                        value={newMember.branch}
                        onChange={(e) => setNewMember({...newMember, branch: e.target.value})}
                        required
                      >
                        <option value="">Select Branch</option>
                        <option value="Downtown">Downtown</option>
                        <option value="North Branch">North Branch</option>
                        <option value="South Branch">South Branch</option>
                        <option value="East Branch">East Branch</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Membership Plan</label>
                      <select 
                        className="form-select" 
                        value={newMember.plan}
                        onChange={(e) => setNewMember({...newMember, plan: e.target.value})}
                        required
                      >
                        <option value="">Select Plan</option>
                        <option value="Basic Monthly">Basic Monthly</option>
                        <option value="Basic Quarterly">Basic Quarterly</option>
                        <option value="Basic Annual">Basic Annual</option>
                        <option value="Standard Monthly">Standard Monthly</option>
                        <option value="Standard Quarterly">Standard Quarterly</option>
                        <option value="Standard Annual">Standard Annual</option>
                        <option value="Premium Monthly">Premium Monthly</option>
                        <option value="Premium Quarterly">Premium Quarterly</option>
                        <option value="Premium Annual">Premium Annual</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Gender</label>
                      <select 
                        className="form-select" 
                        value={newMember.gender}
                        onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Date of Birth</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={newMember.dob}
                        onChange={(e) => setNewMember({...newMember, dob: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={newMember.address}
                        onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="modal-footer mt-3">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn text-white"
                      style={{backgroundColor: "#6EB2CC"}}
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal - Fixed */}
      {showEditForm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Member</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditForm(false)}
                ></button>
              </div>
              <div className="modal-body" style={{maxHeight: "70vh", overflowY: "auto"}}>
                <form onSubmit={handleEditMember}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMember.name}
                        onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMember.phone}
                        onChange={(e) => setEditMember({...editMember, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={editMember.email}
                        onChange={(e) => setEditMember({...editMember, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Branch</label>
                      <select 
                        className="form-select" 
                        value={editMember.branch}
                        onChange={(e) => setEditMember({...editMember, branch: e.target.value})}
                        required
                      >
                        <option value="">Select Branch</option>
                        <option value="Downtown">Downtown</option>
                        <option value="North Branch">North Branch</option>
                        <option value="South Branch">South Branch</option>
                        <option value="East Branch">East Branch</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Membership Plan</label>
                      <select 
                        className="form-select" 
                        value={editMember.plan}
                        onChange={(e) => setEditMember({...editMember, plan: e.target.value})}
                        required
                      >
                        <option value="">Select Plan</option>
                        <option value="Basic Monthly">Basic Monthly</option>
                        <option value="Basic Quarterly">Basic Quarterly</option>
                        <option value="Basic Annual">Basic Annual</option>
                        <option value="Standard Monthly">Standard Monthly</option>
                        <option value="Standard Quarterly">Standard Quarterly</option>
                        <option value="Standard Annual">Standard Annual</option>
                        <option value="Premium Monthly">Premium Monthly</option>
                        <option value="Premium Quarterly">Premium Quarterly</option>
                        <option value="Premium Annual">Premium Annual</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Gender</label>
                      <select 
                        className="form-select" 
                        value={editMember.gender}
                        onChange={(e) => setEditMember({...editMember, gender: e.target.value})}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Date of Birth</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={editMember.dob}
                        onChange={(e) => setEditMember({...editMember, dob: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMember.address}
                        onChange={(e) => setEditMember({...editMember, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="modal-footer mt-3">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowEditForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn text-white"
                      style={{backgroundColor: "#6EB2CC"}}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renew Plan Modal - Fixed */}
      {showRenewForm && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Renew Membership Plan</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowRenewForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleRenewPlan}>
                  <div className="mb-3">
                    <label className="form-label">Membership Plan</label>
                    <select 
                      className="form-select" 
                      value={renewPlan.plan}
                      onChange={(e) => setRenewPlan({...renewPlan, plan: e.target.value})}
                      required
                    >
                      <option value="">Select Plan</option>
                      <option value="Basic Monthly">Basic Monthly</option>
                      <option value="Basic Quarterly">Basic Quarterly</option>
                      <option value="Basic Annual">Basic Annual</option>
                      <option value="Standard Monthly">Standard Monthly</option>
                      <option value="Standard Quarterly">Standard Quarterly</option>
                      <option value="Standard Annual">Standard Annual</option>
                      <option value="Premium Monthly">Premium Monthly</option>
                      <option value="Premium Quarterly">Premium Quarterly</option>
                      <option value="Premium Annual">Premium Annual</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Payment Mode</label>
                    <select 
                      className="form-select" 
                      value={renewPlan.paymentMode}
                      onChange={(e) => setRenewPlan({...renewPlan, paymentMode: e.target.value})}
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                      <option value="upi">UPI</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Amount Paid</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={renewPlan.amountPaid}
                      onChange={(e) => setRenewPlan({...renewPlan, amountPaid: e.target.value})}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowRenewForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn text-white"
                      style={{backgroundColor: "#6EB2CC"}}
                    >
                      Renew Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Member Modal - Fixed */}
      {showViewModal && selectedMember && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Member Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body" style={{maxHeight: "70vh", overflowY: "auto"}}>
                <div className="row">
                  <div className="col-12 col-lg-4 text-center mb-4 mb-lg-0">
                    <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white mx-auto mb-3" style={{width: "120px", height: "120px"}}>
                      <span className="fs-1 fw-bold">
                        {selectedMember.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <h5 className="mb-2">{selectedMember.name}</h5>
                    <span className={`badge ${getStatusClass(selectedMember.status)}`}>
                      {selectedMember.status}
                    </span>
                  </div>
                  <div className="col-12 col-lg-8">
                    <div className="row g-3">
                      <div className="col-12 col-sm-6">
                        <strong>Phone:</strong>
                        <div>{selectedMember.phone}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Email:</strong>
                        <div>{selectedMember.email}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Branch:</strong>
                        <div>{selectedMember.branch}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Plan:</strong>
                        <div>{selectedMember.plan}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Plan Start:</strong>
                        <div>{new Date(selectedMember.planStart).toLocaleDateString()}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Expiry:</strong>
                        <div>{new Date(selectedMember.expiry).toLocaleDateString()}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Gender:</strong>
                        <div>{selectedMember.gender}</div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <strong>Date of Birth:</strong>
                        <div>{new Date(selectedMember.dob).toLocaleDateString()}</div>
                      </div>
                      <div className="col-12">
                        <strong>Address:</strong>
                        <div>{selectedMember.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary w-100 w-md-auto" 
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMember;