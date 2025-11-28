import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SuperAdminAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

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

  const admins = [
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
  ];

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

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Admin';
      case 'edit': return 'Edit Admin';
      case 'view': return 'Admin Details';
      default: return 'Admin Management';
    }
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
            onSubmit={(payload) => {
              alert(`${modalType === 'add' ? 'New admin added' : 'Admin updated'} successfully!`);
              closeModal();
            }}
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

/* ------------------------- REUSABLE MODAL WRAPPER ------------------------- */
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

/* --------------------------- ADMIN FORM COMPONENT -------------------------- */
const AdminForm = ({ mode, admin, onCancel, onSubmit }) => {
  const isView = mode === "view";
  const isAdd = mode === "add";

  const planOptions = {
    Gold: { price: "1200", duration: "12 Months", description: "Full access plan" },
    Silver: { price: "800", duration: "6 Months", description: "Mid-tier plan" },
    Basic: { price: "500", duration: "3 Months", description: "Starter plan" }
  };

  const [selectedPlan, setSelectedPlan] = useState(admin?.plans?.[0]?.planName || "");
  const [planPrice, setPlanPrice] = useState(admin?.plans?.[0]?.price || "");
  const [planDuration, setPlanDuration] = useState(admin?.plans?.[0]?.duration || "");
  const [planDescription, setPlanDescription] = useState(admin?.plans?.[0]?.description || "");

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setSelectedPlan(plan);

    if (planOptions[plan]) {
      setPlanPrice(planOptions[plan].price);
      setPlanDuration(planOptions[plan].duration);
      setPlanDescription(planOptions[plan].description);
    } else {
      setPlanPrice("");
      setPlanDuration("");
      setPlanDescription("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onCancel();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    const payload = {
      name: data.name,
      gymName: data.gymName,
      adminId: data.adminId,
      address: data.address,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: data.password,
      status: data.statusToggle ? "Active" : "Inactive",
      plans: [{ planName: selectedPlan, price: planPrice, duration: planDuration, description: planDescription }]
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Compact Form with Tabs */}
      <ul className="nav nav-tabs mb-3" id="adminFormTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="false">Login</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="plans-tab" data-bs-toggle="tab" data-bs-target="#plans" type="button" role="tab" aria-controls="plans" aria-selected="false">Plans</button>
        </li>
      </ul>

      <div className="tab-content" id="adminFormTabsContent">
        {/* Personal Information Tab */}
        <div className="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Admin Name *</label>
              <input name="name" className="form-control form-control-sm" defaultValue={admin?.name || ""} readOnly={isView} />
            </div>

            {isAdd ? (
              <div className="col-12 col-md-6">
                <label className="form-label fs-6">Gym Name *</label>
                <input name="gymName" className="form-control form-control-sm" placeholder="Enter Gym Name" readOnly={isView} />
              </div>
            ) : (
              <div className="col-12 col-md-6">
                <label className="form-label fs-6">Admin ID *</label>
                <input name="adminId" className="form-control form-control-sm" defaultValue={admin?.adminId || ""} readOnly={isView} />
              </div>
            )}

            <div className="col-12">
              <label className="form-label fs-6">Address *</label>
              <input name="address" className="form-control form-control-sm" defaultValue={admin?.address || ""} readOnly={isView} />
            </div>
            
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Phone *</label>
              <input name="phone" className="form-control form-control-sm" defaultValue={admin?.phone || ""} readOnly={isView} />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Email *</label>
              <input name="email" className="form-control form-control-sm" defaultValue={admin?.email || ""} readOnly={isView} />
            </div>
          </div>
        </div>

        {/* Login Information Tab */}
        <div className="tab-pane fade" id="login" role="tabpanel" aria-labelledby="login-tab">
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Username *</label>
              <input name="username" className="form-control form-control-sm" defaultValue={admin?.username || ""} readOnly={isView} />
            </div>

            {!isView && (
              <div className="col-12 col-md-6">
                <label className="form-label fs-6">Password *</label>
                <input name="password" type="password" className="form-control form-control-sm" />
              </div>
            )}
          </div>
        </div>

        {/* Plans Information Tab */}
        <div className="tab-pane fade" id="plans" role="tabpanel" aria-labelledby="plans-tab">
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Plan Name *</label>
              <select
                name="planName"
                className="form-select form-select-sm"
                value={selectedPlan}
                onChange={handlePlanChange}
                disabled={isView}
              >
                <option value="">Select Plan</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Basic">Basic</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Price *</label>
              <input className="form-control form-control-sm" value={planPrice} readOnly />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-6">Duration *</label>
              <input className="form-control form-control-sm" value={planDuration} readOnly />
            </div>

            <div className="col-12">
              <label className="form-label fs-6">Description *</label>
              <textarea
                className="form-control form-control-sm"
                rows="2"
                value={planDescription}
                readOnly={isView}
                onChange={(e) => setPlanDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Status Toggle */}
      <div className="d-flex align-items-center mb-3">
        <label className="form-label me-3 mb-0 fs-6">Status</label>
        <div className="form-check form-switch">
          <input
            name="statusToggle"
            type="checkbox"
            className="form-check-input"
            defaultChecked={(admin?.status || "Inactive") === "Active"}
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
          <button className="btn btn-sm px-3" style={{ background: "#6EB2CC", color: "#fff" }}>
            {mode === "add" ? "Save Admin" : "Update Admin"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SuperAdminAdmin;