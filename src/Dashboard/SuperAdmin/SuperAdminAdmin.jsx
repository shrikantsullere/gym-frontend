import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import axiosInstance from "../../Api/axiosInstance"; // Keep your axios instance

const SuperAdminAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([
    {
      id: 1,
      fullName: "John Anderson",
      gymName: "FitLife Gym",
      address: "123 Main Street",
      phone: "+1 555-123-4567",
      email: "john@admin.com",
      status: "active",
      planName: "Gold",
      price: "1200",
      duration: "12 Months",
      description: "Full access plan"
    },
    {
      id: 2,
      fullName: "Emma Watson",
      gymName: "Elite Fitness",
      address: "456 Park Avenue",
      phone: "+1 555-987-6543",
      email: "emma@admin.com",
      status: "inactive",
      planName: "",
      price: "",
      duration: "",
      description: ""
    }
  ]);

  // ✅ FETCH PLANS FOR DROPDOWN
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/plans");
        if (response.data.success && Array.isArray(response.data.plans)) {
          setPlans(response.data.plans);
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setPlans([]);
        alert("Failed to load plans. Please try again.");
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

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
      alert(`Admin "${selectedAdmin.fullName}" has been deleted.`);
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
    const normalized = (status || 'inactive').toLowerCase();
    return (
      <span
        className="badge rounded-pill px-2 py-1 d-inline-block"
        style={{
          backgroundColor: normalized === "active" ? "#D1F4E1" : "#F8D7DA",
          color: normalized === "active" ? "#157347" : "#B02A37",
          fontWeight: "500",
          fontSize: "0.75rem"
        }}
      >
        {normalized === "active" ? "Active" : "Inactive"}
      </span>
    );
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Admin';
      case 'edit': return 'Edit Admin';
      case 'view': return 'Admin Details';
      default: return 'Admin Management';
    }
  };

  const handleFormSubmit = (payload) => {
    if (modalType === 'add') {
      const newId = Math.max(...admins.map(admin => admin.id), 0) + 1;
      const newAdmin = {
        id: newId,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        gymName: payload.gymName,
        address: payload.address,
        planName: payload.planName,
        price: payload.planPrice,
        duration: payload.planDuration,
        description: payload.planDescription,
        status: payload.status.toLowerCase()
      };
      setAdmins([...admins, newAdmin]);
      alert('New admin added successfully!');
    } else if (modalType === 'edit' && selectedAdmin) {
      const updatedAdmins = admins.map(admin => {
        if (admin.id === selectedAdmin.id) {
          return {
            ...admin,
            fullName: payload.fullName,
            email: payload.email,
            phone: payload.phone,
            gymName: payload.gymName,
            address: payload.address,
            planName: payload.planName,
            price: payload.planPrice,
            duration: payload.planDuration,
            description: payload.planDescription,
            status: payload.status.toLowerCase()
          };
        }
        return admin;
      });
      setAdmins(updatedAdmins);
      alert('Admin updated successfully!');
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
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: "16px", background: "#ffffff" }}
      >
        <div className="card-body p-0">
          {/* Desktop Table */}
          <div className="table-responsive d-none d-md-block">
            <table className="table align-middle mb-0">
              <thead style={{ background: "#F8F9FB" }}>
                <tr>
                  <th className="py-3">ADMIN NAME</th>
                  <th className="py-3">PLAN NAME</th>
                  <th className="py-3">GYM NAME</th>
                  <th className="py-3">ADDRESS</th>
                  <th className="py-3">CONTACT</th>
                  <th className="py-3">STATUS</th>
                  <th className="py-3 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    style={{ transition: "0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F1FBFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td><strong>{admin.fullName}</strong></td>
                    <td>{admin.planName || <span className="text-muted">No Plan</span>}</td>
                    <td>{admin.gymName}</td>
                    <td><small className="text-muted">{admin.address}</small></td>
                    <td>{admin.phone}</td>
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
                    <h5 className="card-title mb-0 fw-bold">{admin.fullName}</h5>
                    {getStatusBadge(admin.status)}
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <small className="text-muted d-block">Gym</small>
                      <span>{admin.gymName}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Plan</small>
                      <span>{admin.planName || <span className="text-muted">No Plan</span>}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted d-block">Address</small>
                    <span>{admin.address}</span>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted d-block">Phone</small>
                    <span>{admin.phone}</span>
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
              This will permanently delete <strong>{selectedAdmin?.fullName}</strong>.
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

/* ------------------------- MODAL WRAPPER ------------------------- */
const ModalWrapper = ({ title, children, onClose }) => (
  <div
    className="modal fade show"
    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    onClick={onClose}
  >
    <div
      className="modal-dialog modal-dialog-centered modal-md"
      style={{ maxWidth: "600px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content p-0" style={{ borderRadius: "14px" }}>
        <div className="modal-header border-0 py-2 px-3">
          <h5 className="modal-title fw-bold fs-5">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body p-3">{children}</div>
      </div>
    </div>
  </div>
);

/* --------------------------- ADMIN FORM -------------------------- */
const AdminForm = ({ mode, admin, onCancel, onSubmit, plans, loadingPlans }) => {
  const isView = mode === "view";
  const isAdd = mode === "add";

  const [formData, setFormData] = useState({
    fullName: admin?.fullName || "",
    gymName: admin?.gymName || "",
    address: admin?.address || "",
    phone: admin?.phone || "",
    email: admin?.email || "",
    password: "",
    status: (admin?.status || "active"),
    selectedPlanId: "", // for dropdown
    planName: admin?.planName || "",
    planPrice: admin?.price || "",
    planDuration: admin?.duration || "",
    planDescription: admin?.description || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ HANDLE PLAN SELECTION FROM DROPDOWN
  const handlePlanChange = (planId) => {
    const selectedPlan = plans.find(p => p.id == planId);
    if (selectedPlan) {
      // Convert duration (in days) to "X Months" or keep as is — adjust if needed
      const durationText = selectedPlan.duration; // assuming it's already "1 Months", etc.

      setFormData(prev => ({
        ...prev,
        selectedPlanId: planId,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price.toString(),
        planDuration: durationText,
        planDescription: selectedPlan.description || `Plan for ${durationText} @ ₹${selectedPlan.price}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        selectedPlanId: "",
        planName: "",
        planPrice: "",
        planDuration: "",
        planDescription: ""
      }));
    }
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === "active" ? "inactive" : "active"
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onCancel();

    const payload = {
      ...formData
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Info */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Personal Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12">
            <label className="form-label fs-6">Full Name *</label>
            <input 
              name="fullName" 
              className="form-control form-control-sm" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              readOnly={isView} 
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label fs-6">Gym Name *</label>
            <input 
              name="gymName" 
              className="form-control form-control-sm" 
              value={formData.gymName}
              onChange={handleInputChange}
              readOnly={isView} 
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label fs-6">Address *</label>
            <input 
              name="address" 
              className="form-control form-control-sm" 
              value={formData.address} 
              onChange={handleInputChange}
              readOnly={isView} 
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Phone *</label>
            <input 
              name="phone" 
              className="form-control form-control-sm" 
              value={formData.phone} 
              onChange={handleInputChange}
              readOnly={isView} 
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Email *</label>
            <input 
              name="email" 
              type="email"
              className="form-control form-control-sm" 
              value={formData.email} 
              onChange={handleInputChange}
              readOnly={isView} 
              required
            />
          </div>
        </div>
      </div>

      {/* Login Info (Password only for add) */}
      {isAdd && (
        <div className="mb-4">
          <h6 className="fw-bold mb-3 text-primary">Login Information</h6>
          <div className="row g-2 mb-3">
            <div className="col-12">
              <label className="form-label fs-6">Password *</label>
              <input 
                name="password" 
                type="password" 
                className="form-control form-control-sm" 
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* ✅ PLAN DROPDOWN + AUTO-FILL */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Plan Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12">
            <label className="form-label fs-6">Select Plan *</label>
            {loadingPlans ? (
              <div className="form-control form-control-sm" disabled>Loading plans...</div>
            ) : (
              <select
                className="form-select form-select-sm"
                value={formData.selectedPlanId}
                onChange={(e) => handlePlanChange(e.target.value)}
                disabled={isView}
                required={!isView}
              >
                <option value="">-- Choose Plan --</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} (₹{plan.price}, {plan.duration})
                  </option>
                ))}
              </select>
            )}
          </div>

          {formData.selectedPlanId && (
            <>
              <div className="col-12 col-md-6">
                <label className="form-label fs-6">Price</label>
                <input 
                  className="form-control form-control-sm" 
                  value={formData.planPrice} 
                  readOnly
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label fs-6">Duration</label>
                <input 
                  className="form-control form-control-sm" 
                  value={formData.planDuration} 
                  readOnly
                />
              </div>
              <div className="col-12">
                <label className="form-label fs-6">Description</label>
                <textarea
                  name="planDescription"
                  className="form-control form-control-sm"
                  rows="2"
                  value={formData.planDescription}
                  onChange={handleInputChange}
                  readOnly={isView}
                ></textarea>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="d-flex align-items-center mb-3">
        <label className="form-label me-3 mb-0 fs-6">Status</label>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={formData.status === "active"}
            onChange={handleStatusToggle}
            disabled={isView}
          />
          <span className="ms-2">{formData.status === "active" ? "Active" : "Inactive"}</span>
        </div>
      </div>

      {/* Buttons */}
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