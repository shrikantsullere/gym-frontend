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
        className="badge rounded-pill px-3 py-1"
        style={{
          backgroundColor: status === "Active" ? "#D1F4E1" : "#F8D7DA",
          color: status === "Active" ? "#157347" : "#B02A37",
          fontWeight: "500"
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
    <div className="p-4">

      {/* HEADER */}
      <div className="row mb-4 align-items-center">
        <div className="col-lg-8 mb-3">
          <h2 className="fw-bold">Admin Management</h2>
          <p className="text-muted">Manage all gym admins and their profile details.</p>
        </div>

        <div className="col-lg-4 text-lg-end">
          <button
            className="btn w-100 w-lg-auto"
            style={{
              backgroundColor: '#6EB2CC',
              color: '#fff',
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '1rem'
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
          padding: "10px 15px",
          background: "#ffffff",
        }}
      >
        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ minWidth: "900px" }}>
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
      </div>

      {/* MODALS (same as your original — no break) */}
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
      className="modal-dialog modal-lg modal-dialog-centered"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content p-3" style={{ borderRadius: "14px" }}>
        <div className="modal-header border-0 pb-0">
          <h5 className="modal-title fw-bold">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">{children}</div>
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
      
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Admin Name *</label>
          <input name="name" className="form-control" defaultValue={admin?.name || ""} readOnly={isView} />
        </div>

        {isAdd ? (
          <div className="col-md-6">
            <label className="form-label">Gym Name *</label>
            <input name="gymName" className="form-control" placeholder="Enter Gym Name" readOnly={isView} />
          </div>
        ) : (
          <div className="col-md-6">
            <label className="form-label">Admin ID *</label>
            <input name="adminId" className="form-control" defaultValue={admin?.adminId || ""} readOnly={isView} />
          </div>
        )}
      </div>

      <div className="row mt-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Address *</label>
          <input name="address" className="form-control" defaultValue={admin?.address || ""} readOnly={isView} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone *</label>
          <input name="phone" className="form-control" defaultValue={admin?.phone || ""} readOnly={isView} />
        </div>
      </div>

      <div className="row mt-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input name="email" className="form-control" defaultValue={admin?.email || ""} readOnly={isView} />
        </div>
      </div>

      <h6 className="fw-semibold mt-4 mb-2">Login Information</h6>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Username *</label>
          <input name="username" className="form-control" defaultValue={admin?.username || ""} readOnly={isView} />
        </div>

        {!isView && (
          <div className="col-md-6">
            <label className="form-label">Password *</label>
            <input name="password" type="password" className="form-control" />
          </div>
        )}
      </div>

      <h6 className="fw-semibold mt-4 mb-2">Plans Information</h6>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Plan Name *</label>
          <select
            name="planName"
            className="form-control"
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

        <div className="col-md-6">
          <label className="form-label">Price *</label>
          <input className="form-control" value={planPrice} readOnly />
        </div>

        <div className="col-md-6">
          <label className="form-label">Duration *</label>
          <input className="form-control" value={planDuration} readOnly />
        </div>

        <div className="col-md-12">
          <label className="form-label">Description *</label>
          <textarea
            className="form-control"
            rows="2"
            value={planDescription}
            readOnly={isView}
            onChange={(e) => setPlanDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="mt-3">
        <label className="form-label me-3">Status</label>
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

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancel}>
          Close
        </button>
        {!isView && (
          <button className="btn px-4" style={{ background: "#6EB2CC", color: "#fff" }}>
            {mode === "add" ? "Save Admin" : "Update Admin"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SuperAdminAdmin;
