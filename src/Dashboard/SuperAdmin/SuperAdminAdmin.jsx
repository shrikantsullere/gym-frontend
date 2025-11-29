// SuperAdminAdmin.jsx
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

/**
 * Single-file React component with:
 * - Admin list (desktop table + mobile cards)
 * - Add / View / Edit / Delete flows with modals
 * - Polished UI (no external CSS required)
 *
 * Drop into your React app. Requires `react-icons`.
 */

const SuperAdminAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' | 'edit' | 'view'
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  // Move admins to state so we can update it
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
      plans: [{ planName: "Gold", price: "1200", duration: "12 Months", description: "Full access plan" }]
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
      plans: []
    }
  ]);

<<<<<<< HEAD
  // dynamic admins state (editable)
  const [admins, setAdmins] = useState(() => [
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
      plans: [{ planName: "Gold", price: "1200", duration: "12 Months", description: "Full access plan" }]
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
      plans: []
    }
  ]);

  // keep body scroll locked when modal open
  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isDeleteModalOpen) ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen, isDeleteModalOpen]);

  const handleAddNew = () => {
    setModalType("add");
    setSelectedAdmin(null);
    setIsModalOpen(true);
=======
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
      // Update the admins state by filtering out the deleted admin
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
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
  };

  const handleView = (admin) => {
    setModalType("view");
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setModalType("edit");
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAdmin) {
      setAdmins(prev => prev.filter(a => a.id !== selectedAdmin.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

<<<<<<< HEAD
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAdmin(null);
  };

  const onSubmitForm = (payload) => {
    if (modalType === "add") {
      const newAdmin = {
        ...payload,
        id: Date.now(),
        adminId: payload.adminId || `ADM${Math.floor(Math.random() * 900 + 100)}`,
      };
      setAdmins(prev => [newAdmin, ...prev]);
    } else if (modalType === "edit" && selectedAdmin) {
      setAdmins(prev => prev.map(a => a.id === selectedAdmin.id ? { ...a, ...payload } : a));
    }
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const getStatusBadge = (status) => (
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

=======
  // Function to handle form submission for add/edit
  const handleFormSubmit = (payload) => {
    if (modalType === 'add') {
      // Generate a new unique ID (simple approach)
      const newId = Math.max(...admins.map(admin => admin.id), 0) + 1;
      
      // Create a new admin object with the form data
      const newAdmin = {
        id: newId,
        name: payload.name,
        adminId: payload.adminId || `ADM${newId.toString().padStart(2, '0')}`,
        address: payload.address,
        role: "Primary Admin", // Default role
        phone: payload.phone,
        email: payload.email,
        status: payload.status,
        username: payload.username,
        plans: payload.planName ? [{
          planName: payload.planName,
          price: payload.planPrice,
          duration: payload.planDuration,
          description: payload.planDescription
        }] : []
      };
      
      // Add the new admin to the state
      setAdmins([...admins, newAdmin]);
      alert('New admin added successfully!');
    } else if (modalType === 'edit' && selectedAdmin) {
      // Update existing admin
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
            plans: payload.planName ? [{
              planName: payload.planName,
              price: payload.planPrice,
              duration: payload.planDuration,
              description: payload.planDescription
            }] : []
          };
        }
        return admin;
      });
      
      setAdmins(updatedAdmins);
      alert('Admin updated successfully!');
    }
    
    closeModal();
  };

>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
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
        style={{
          borderRadius: "16px",
          background: "#ffffff",
        }}
      >
        <div className="card-body p-0">
          {/* Desktop Table View */}
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
                  <tr
                    key={admin.id}
                    style={{ transition: "0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F1FBFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td><strong>{admin.name}</strong></td>
                    <td>{admin.plans?.[0]?.planName || <span className="text-muted">No Plan</span>}</td>
                    <td>{admin.adminId}</td>
                    <td><small className="text-muted">{admin.address}</small></td>

                    <td>
                      <strong>{admin.phone}</strong>
                      <br />
                      <small className="text-muted">{admin.role}</small>
                    </td>

                    <td>{getStatusBadge(admin.status)}</td>

                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <ActionButton title="View" onClick={() => handleView(admin)}><FaEye size={14} /></ActionButton>
                        <ActionButton title="Edit" onClick={() => handleEdit(admin)} primary><FaEdit size={14} /></ActionButton>
                        <ActionButton title="Delete" onClick={() => handleDeleteClick(admin)} danger><FaTrashAlt size={14} /></ActionButton>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
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
                      <span>{admin.plans?.[0]?.planName || <span className="text-muted">No Plan</span>}</span>
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
                    <ActionButton title="View" onClick={() => handleView(admin)}><FaEye size={14} /></ActionButton>
                    <ActionButton title="Edit" onClick={() => handleEdit(admin)} primary><FaEdit size={14} /></ActionButton>
                    <ActionButton title="Delete" onClick={() => handleDeleteClick(admin)} danger><FaTrashAlt size={14} /></ActionButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {isModalOpen && (
        <ModalWrapper title={modalType === "add" ? "Add New Admin" : modalType === "edit" ? "Edit Admin" : "Admin Details"} onClose={closeModal}>
          <AdminForm
            mode={modalType}
            admin={selectedAdmin}
            onCancel={closeModal}
<<<<<<< HEAD
            onSubmit={onSubmitForm}
=======
            onSubmit={handleFormSubmit} // Use the new handler function
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
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

/* -------------------------- SMALL ACTION BUTTON --------------------------- */
const ActionButton = ({ children, title, onClick, primary, danger }) => (
  <button
    title={title}
    onClick={onClick}
    className="btn btn-sm"
    style={{
      borderRadius: 8,
      padding: "6px 8px",
      border: "1px solid rgba(0,0,0,0.08)",
      background: primary ? "#E9F7F9" : danger ? "#fff5f6" : "#ffffff",
      color: primary ? "#0b7285" : danger ? "#b02a37" : "#495057",
      boxShadow: "0 1px 2px rgba(16,24,40,0.04)"
    }}
  >
    {children}
  </button>
);

/* ------------------------- REUSABLE MODAL WRAPPER ------------------------- */
const ModalWrapper = ({ title, children, onClose }) => (
  <div
    className="modal fade show"
    style={{
      display: "block",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(4px)",
      zIndex: 1050
    }}
    onClick={onClose}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ maxWidth: "720px", padding: "16px" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="modal-content"
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: "none",
          boxShadow: "0 12px 50px rgba(2,6,23,0.12)"
        }}
      >
        <div
          className="modal-header"
          style={{
            background: "#F4FAFF",
            borderBottom: "1px solid #e9f2f8",
            padding: "14px 20px"
          }}
        >
          <h5 className="modal-title fw-bold">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body p-4">{children}</div>
      </div>
    </div>
  </div>
);

/* --------------------------- ADMIN FORM COMPONENT -------------------------- */
const AdminForm = ({ mode, admin, onCancel, onSubmit }) => {
  const isView = mode === "view";
  const isAdd = mode === "add";

  const planOptions = {
    Gold: { price: "1200", duration: "12 Months", description: "Full access plan" },
    Silver: { price: "800", duration: "6 Months", description: "Mid-tier plan" },
    Basic: { price: "500", duration: "3 Months", description: "Starter plan" }
  };

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    gymName: "",
    adminId: admin?.adminId || "",
    address: admin?.address || "",
    phone: admin?.phone || "",
    email: admin?.email || "",
    username: admin?.username || "",
    password: "",
    role: admin?.role || "",
    status: admin?.status || "Inactive",
    planName: admin?.plans?.[0]?.planName || "",
    planPrice: admin?.plans?.[0]?.price || "",
    planDuration: admin?.plans?.[0]?.duration || "",
    planDescription: admin?.plans?.[0]?.description || ""
  });

  useEffect(() => {
    // when admin prop changes (open modal), sync initial form values
    setFormData({
      name: admin?.name || "",
      gymName: "",
      adminId: admin?.adminId || "",
      address: admin?.address || "",
      phone: admin?.phone || "",
      email: admin?.email || "",
      username: admin?.username || "",
      password: "",
      role: admin?.role || "",
      status: admin?.status || "Inactive",
      planName: admin?.plans?.[0]?.planName || "",
      planPrice: admin?.plans?.[0]?.price || "",
      planDuration: admin?.plans?.[0]?.duration || "",
      planDescription: admin?.plans?.[0]?.description || ""
    });
  }, [admin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (planName) => {
    if (planOptions[planName]) {
      setFormData(prev => ({
        ...prev,
        planName,
        planPrice: planOptions[planName].price,
        planDuration: planOptions[planName].duration,
        planDescription: planOptions[planName].description
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        planName: "",
        planPrice: "",
        planDuration: "",
        planDescription: ""
      }));
    }
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({ ...prev, status: prev.status === "Active" ? "Inactive" : "Active" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onCancel();

    const payload = {
      name: formData.name,
      adminId: formData.adminId,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      username: formData.username,
      role: formData.role,
      status: formData.status,
      plans: [{
        planName: formData.planName,
        price: formData.planPrice,
        duration: formData.planDuration,
        description: formData.planDescription
      }]
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
<<<<<<< HEAD
      {/* Local styles used for pretty inputs */}
      <style>{`
        .section-title {
          font-size: 15px;
          font-weight: 600;
          padding-bottom: 6px;
          margin-bottom: 12px;
          border-bottom: 2px solid #EAF9FF;
          color: #0b7285;
        }
        .pretty-input {
          border-radius: 10px !important;
          padding: 9px 12px !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: none !important;
        }
        .pretty-input:focus {
          border-color: #6EB2CC !important;
          box-shadow: 0 6px 18px rgba(110,178,204,0.12) !important;
          outline: none !important;
        }
      `}</style>

      {/* Personal Information */}
      <div className="mb-3">
        <div className="section-title">Personal Information</div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Admin Name *</label>
            <input name="name" className="form-control pretty-input" value={formData.name} onChange={handleInputChange} readOnly={isView} />
          </div>

          {isAdd ? (
            <div className="col-md-6">
              <label className="form-label">Gym Name *</label>
              <input name="gymName" className="form-control pretty-input" value={formData.gymName} onChange={handleInputChange} readOnly={isView} />
            </div>
          ) : (
            <div className="col-md-6">
              <label className="form-label">Admin ID *</label>
              <input name="adminId" className="form-control pretty-input" value={formData.adminId} onChange={handleInputChange} readOnly />
=======
      {/* Personal Information Section */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Personal Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Admin Name *</label>
            <input 
              name="name" 
              className="form-control form-control-sm" 
              value={formData.name} 
              onChange={handleInputChange} 
              readOnly={isView} 
              required
            />
          </div>

          {isAdd ? (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Gym Name *</label>
              <input 
                name="gymName" 
                className="form-control form-control-sm" 
                value={formData.gymName}
                onChange={handleInputChange}
                placeholder="Enter Gym Name" 
                readOnly={isView} 
                required
              />
            </div>
          ) : (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Admin ID *</label>
              <input 
                name="adminId" 
                className="form-control form-control-sm" 
                value={formData.adminId} 
                onChange={handleInputChange}
                readOnly={isView} 
                required
              />
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
            </div>
          )}

          <div className="col-12">
<<<<<<< HEAD
            <label className="form-label">Address *</label>
            <input name="address" className="form-control pretty-input" value={formData.address} onChange={handleInputChange} readOnly={isView} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone *</label>
            <input name="phone" className="form-control pretty-input" value={formData.phone} onChange={handleInputChange} readOnly={isView} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input name="email" className="form-control pretty-input" value={formData.email} onChange={handleInputChange} readOnly={isView} />
=======
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
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Login Information */}
      <div className="mb-3">
        <div className="section-title">Login Information</div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Username *</label>
            <input name="username" className="form-control pretty-input" value={formData.username} onChange={handleInputChange} readOnly={isView} />
          </div>

          {!isView && (
            <div className="col-md-6">
              <label className="form-label">Password *</label>
              <input name="password" type="password" className="form-control pretty-input" value={formData.password} onChange={handleInputChange} />
=======
      {/* Login Information Section */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Login Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Username *</label>
            <input 
              name="username" 
              className="form-control form-control-sm" 
              value={formData.username} 
              onChange={handleInputChange}
              readOnly={isView} 
              required
            />
          </div>

          {!isView && (
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Password *</label>
              <input 
                name="password" 
                type="password" 
                className="form-control form-control-sm" 
                value={formData.password}
                onChange={handleInputChange}
                required={isAdd}
              />
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      {/* Plan Information */}
      <div className="mb-3">
        <div className="section-title">Plan Information</div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Plan Name *</label>
            <select name="planName" className="form-select pretty-input" value={formData.planName} onChange={(e) => handlePlanChange(e.target.value)} disabled={isView}>
=======
      {/* Plan Information Section */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-primary">Plan Information</h6>
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label fs-6">Plan Name *</label>
            <select
              name="planName"
              className="form-select form-select-sm"
              value={formData.planName}
              onChange={(e) => handlePlanChange(e.target.value)}
              disabled={isView}
              required
            >
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
              <option value="">Select Plan</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Basic">Basic</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input className="form-control pretty-input" value={formData.planPrice} readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label">Duration</label>
            <input className="form-control pretty-input" value={formData.planDuration} readOnly />
          </div>

          <div className="col-12">
<<<<<<< HEAD
            <label className="form-label">Description</label>
            <textarea name="planDescription" className="form-control pretty-input" rows={2} value={formData.planDescription} onChange={handleInputChange} readOnly={isView}></textarea>
=======
            <label className="form-label fs-6">Description *</label>
            <textarea
              name="planDescription"
              className="form-control form-control-sm"
              rows="2"
              value={formData.planDescription}
              onChange={handleInputChange}
              readOnly={isView}
              required
            ></textarea>
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
          </div>
        </div>
      </div>

      {/* Role + Status */}
      <div className="row align-items-center mb-3">
        <div className="col-md-6">
          <label className="form-label">Role</label>
          <input name="role" className="form-control pretty-input" value={formData.role} onChange={handleInputChange} readOnly={isView} placeholder="e.g. Primary Admin, Co-Admin" />
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
          <label className="me-3 mb-0">Status</label>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={formData.status === "Active"} onChange={handleStatusToggle} disabled={isView} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex justify-content-end gap-2 mt-2">
        <button type="button" className="btn btn-outline-secondary px-3" onClick={onCancel}>Close</button>
        {!isView && (
<<<<<<< HEAD
          <button className="btn px-4" style={{ background: "#6EB2CC", color: "#fff", borderRadius: 8 }}>
            {isAdd ? "Save Admin" : "Update Admin"}
=======
          <button type="submit" className="btn btn-sm px-3" style={{ background: "#6EB2CC", color: "#fff" }}>
            {mode === "add" ? "Save Admin" : "Update Admin"}
>>>>>>> 8c19bdfd8597d9eff084da6c1005e254606bdc40
          </button>
        )}
      </div>
    </form>
  );
};

export default SuperAdminAdmin;
