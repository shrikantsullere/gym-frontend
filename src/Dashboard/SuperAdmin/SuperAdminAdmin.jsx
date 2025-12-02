import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axiosInstance from '../../Api/axiosInstance';

const SuperAdminAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  
  // ✅ Updated mock data: use planId instead of full plan object
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "John Anderson",
      adminId: "ADM01",
      address: "123 Main Street",
      role: "Primary Admin",
      phone: "+1 555-123-4567",
      email: "john@admin.com",
      status: "Active",
      username: "john_admin",
      planId: 1 // ✅ Only store ID
    },
    {
      id: 2,
      name: "Emma Watson",
      adminId: "ADM02",
      address: "456 Park Avenue",
      role: "Co-Admin",
      phone: "+1 555-987-6543",
      email: "emma@admin.com",
      status: "Inactive",
      username: "emma_admin",
      planId: null // ✅ No plan = null
    }
  ]);

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get('/superadmin/saas-plan/plans');
        if (res.data.success && Array.isArray(res.data.plans)) {
          setPlans(res.data.plans);
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  // Utility: Get plan by ID
  const getPlanById = (id) => plans.find(p => p.id === id);

  const handleAddNew = () => {
    setModalType('add');
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const handleView = (admin) => {
    setModalType('view');
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setModalType('edit');
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAdmin) {
      setAdmins(admins.filter(admin => admin.id !== selectedAdmin.id));
      alert(`Admin "${selectedAdmin.name}" has been deleted.`);
    }
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isDeleteModalOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, isDeleteModalOpen]);

  const getStatusBadge = (status) => {
    return (
      <span
        className="badge rounded-pill px-2 py-1 d-inline-block"
        style={{
          backgroundColor: status === "Active" ? "#D1F4E1" : "#F8D7DA",
          color: status === "Active" ? "#157347" : "#B02A37",
          fontWeight: "500",
          fontSize: "0.75rem"
        }}
      >
        {status}
      </span>
    );
  };

  const getPlanNameById = (planId) => {
    const plan = getPlanById(planId);
    return plan ? plan.planName : <span className="text-muted">No Plan</span>;
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Admin';
      case 'edit': return 'Edit Admin';
      case 'view': return 'Admin Details';
      default: return 'Admin Management';
    }
  };

  // ✅ Submit with planId (matches backend)
  const handleFormSubmit = async (payload) => {
    try {
      if (modalType === 'add') {
        // ✅ Send payload exactly as backend expects
        const createPayload = {
          name: payload.name,
          gymName: payload.gymName,
          address: payload.address,
          phone: payload.phone,
          email: payload.email,
          username: payload.username,
          password: payload.password,
          status: payload.status, // "Active" → should be "ACTIVE"?
          planId: payload.planId || null
        };

        const res = await axiosInstance.post('/superadmin/admins', createPayload);
        if (res.data.success) {
          // Optionally update local state with real data from response
          const newAdmin = res.data.admin;
          setAdmins(prev => [...prev, {
            ...newAdmin,
            status: newAdmin.status === "ACTIVE" ? "Active" : "Inactive"
          }]);
          alert('Admin created successfully!');
        }
      } else if (modalType === 'edit' && selectedAdmin) {
        // For edit, you'd use PUT /superadmin/admins/:id (not implemented here)
        // For now, just update local state
        const updatedAdmins = admins.map(admin => {
          if (admin.id === selectedAdmin.id) {
            return {
              ...admin,
              name: payload.name,
              adminId: payload.adminId,
              address: payload.address,
              phone: payload.phone,
              email: payload.email,
              status: payload.status,
              username: payload.username,
              planId: payload.planId || null
            };
          }
          return admin;
        });
        setAdmins(updatedAdmins);
        alert('Admin updated successfully!');
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Failed to save admin. Please try again.');
    }
    closeModal();
  };

  return (
    <div className="container-fluid p-2 p-sm-3 p-md-4">
      {/* HEADER */}
      <div className="row mb-3 mb-md-4 align-items-center">
        <div className="col-12 col-md-8 mb-3 mb-md-0">
          <h2 className="fw-bold fs-4 fs-md-3">Admin Management</h2>
          <p className="text-muted fs-6">Manage all gym admins and their profile details.</p>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <button
            className="btn w-100 w-md-auto"
            style={{
              backgroundColor: '#6EB2CC',
              color: '#fff',
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
            onClick={handleAddNew}
          >
            + Add New Admin
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: "16px", background: "#ffffff" }}>
        <div className="card-body p-0">
          <div className="table-responsive d-none d-md-block">
            <table className="table align-middle mb-0">
              <thead style={{ background: "#F8F9FB" }}>
                <tr>
                  <th className="py-3">ADMIN NAME</th>
                  <th className="py-3">PLAN NAME</th>
                  <th className="py-3">ADMIN ID</th>
                  <th className="py-3">ADDRESS</th>
                  <th className="py-3">CONTACT / ROLE</th>
                  <th className="py-3">STATUS</th>
                  <th className="py-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} style={{ transition: "0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F1FBFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td><strong>{admin.name}</strong></td>
                    <td>{getPlanNameById(admin.planId)}</td> {/* ✅ Show plan name from ID */}
                    <td>{admin.adminId}</td>
                    <td><small className="text-muted">{admin.address}</small></td>
                    <td>
                      <strong>{admin.phone}</strong><br />
                      <small className="text-muted">{admin.role}</small>
                    </td>
                    <td>{getStatusBadge(admin.status)}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleView(admin)}>
                          <FaEye size={14} />
                        </button>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(admin)}>
                          <FaEdit size={14} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(admin)}>
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="d-md-none p-3">
            {admins.map((admin) => (
              <div key={admin.id} className="card mb-3 shadow-sm" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0 fw-bold">{admin.name}</h5>
                    {getStatusBadge(admin.status)}
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <small className="text-muted d-block">Admin ID</small>
                      <span>{admin.adminId}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Plan</small>
                      <span>{getPlanNameById(admin.planId)}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted d-block">Address</small>
                    <span>{admin.address}</span>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <small className="text-muted d-block">Phone</small>
                      <span>{admin.phone}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Role</small>
                      <span>{admin.role}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleView(admin)}>
                      <FaEye size={14} />
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(admin)}>
                      <FaEdit size={14} />
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(admin)}>
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}


      {isModalOpen && (
        <ModalWrapper title={getModalTitle()} onClose={closeModal}>
          <AdminForm
            mode={modalType}
            admin={selectedAdmin}
            onCancel={closeModal}
            onSubmit={handleFormSubmit}
            plans={plans}
            loadingPlans={loadingPlans}
          />
        </ModalWrapper>
      )}

      {isDeleteModalOpen && (
        <ModalWrapper title="Confirm Deletion" onClose={closeDeleteModal}>
          <div className="text-center py-4">
            <h5>Are you sure?</h5>
            <p className="text-muted">
              This will permanently delete <strong>{selectedAdmin?.name}</strong>.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-outline-secondary px-4" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </ModalWrapper>
      )}


    </div>
  );
};

/* MODAL WRAPPER */
const ModalWrapper = ({ title, children, onClose }) => (
  <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
    <div className="modal-dialog modal-dialog-centered modal-md" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
      <div className="modal-content p-0" style={{ borderRadius: "14px" }}>
        <div className="modal-header border-0 py-3 px-3">
          <h5 className="modal-title fw-bold fs-5">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body p-3">{children}</div>
      </div>
    </div>
  </div>
);

/* ADMIN FORM */
const AdminForm = ({ mode, admin, onCancel, onSubmit, plans = [], loadingPlans = false }) => {
  const isView = mode === "view";
  const isAdd = mode === "add";

  // ✅ Initialize with planId (not planName)
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    gymName: "",
    adminId: admin?.adminId || "",
    address: admin?.address || "",
    phone: admin?.phone || "",
    email: admin?.email || "",
    username: admin?.username || "",
    password: "",
    status: admin?.status === "Active" ? "Active" : "Inactive",
    planId: admin?.planId || "" // ✅ store ID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === "Active" ? "Inactive" : "Active"
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onCancel();

    // Map status to backend format if needed
    const statusForApi = formData.status === "Active" ? "ACTIVE" : "INACTIVE";

    const payload = {
      ...formData,
      status: statusForApi,
      planId: formData.planId ? Number(formData.planId) : null
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Personal Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Admin Name *</label>
            <input name="name" className="form-control form-control-sm" value={formData.name}
              onChange={handleInputChange} readOnly={isView} required />
          </div>
          {isAdd ? (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Gym Name *</label>
              <input name="gymName" className="form-control form-control-sm" value={formData.gymName}
                onChange={handleInputChange} placeholder="Enter Gym Name" readOnly={isView} required />
            </div>
          ) : (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Admin ID *</label>
              <input name="adminId" className="form-control form-control-sm" value={formData.adminId}
                onChange={handleInputChange} readOnly={isView} required />
            </div>
          )}
          <div className="col-12">
            <label className="form-label fs-6">Address *</label>
            <input name="address" className="form-control form-control-sm" value={formData.address}
              onChange={handleInputChange} readOnly={isView} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Phone *</label>
            <input name="phone" className="form-control form-control-sm" value={formData.phone}
              onChange={handleInputChange} readOnly={isView} required />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Email *</label>
            <input name="email" type="email" className="form-control form-control-sm" value={formData.email}
              onChange={handleInputChange} readOnly={isView} required />
          </div>
        </div>
      </div>

      {/* Login Information */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Login Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Username *</label>
            <input name="username" className="form-control form-control-sm" value={formData.username}
              onChange={handleInputChange} readOnly={isView} required />
          </div>
          {!isView && (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Password *</label>
              <input name="password" type="password" className="form-control form-control-sm" value={formData.password}
                onChange={handleInputChange} required={isAdd} />
            </div>
          )}
        </div>
      </div>

      {/* Plan Selection — now by ID */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Plan Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12">
            <label className="form-label fs-6">Select Plan</label>
            <select
              name="planId"
              className="form-select form-select-sm"
              value={formData.planId || ""}
              onChange={handleInputChange}
              disabled={isView || loadingPlans}
            >
              <option value="">No Plan</option>
              {loadingPlans ? (
                <option disabled>Loading plans...</option>
              ) : (
                plans
                  .filter(plan => plan.status === 'Active')
                  .map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.planName}
                    </option>
                  ))
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Status Tzoggle */}
      <div className="d-flex align-items-center mb-3">
        <label className="form-label me-3 mb-0 fs-6">Status</label>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={formData.status === "Active"}
            onChange={handleStatusToggle}
            disabled={isView}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-secondary btn-sm px-3" onClick={onCancel}>
          Close
        </button>
        {!isView && (
          <button type="submit" className="btn btn-sm px-3" style={{ background: "#6EB2CC", color: "#fff" }}>
            {mode === "add" ? "Save Admin" : "Update Admin"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SuperAdminAdmin;