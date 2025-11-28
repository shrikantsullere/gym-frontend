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
      plans: [
        { planName: "Gold", price: "1200", duration: "12 Months", description: "Full access plan" }
      ]
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
    const badgeClasses = {
      Active: "bg-success-subtle text-success-emphasis",
      Inactive: "bg-danger-subtle text-danger-emphasis",
    };
    return (
      <span className={`badge rounded-pill ${badgeClasses[status] || 'bg-secondary'} px-3 py-1`}>
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
    <div className="p-3 p-md-2">

      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          <h2 className="fw-bold h3 h2-md">Admin Management</h2>
          <p className="text-muted mb-0">Manage all gym admins and their profile details.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end">
          <button
            className="btn w-100 w-lg-auto"
            style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '1rem', fontWeight: '500' }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus me-2"></i> Add New Admin
          </button>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>ADMIN NAME</th>
                <th>ADMIN ID</th>
                <th>ADDRESS</th>
                <th>CONTACT / ROLE</th>
                <th>STATUS</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover-row" style={{ cursor: 'pointer' }}>

                  <td onClick={() => handleView(admin)}>
                    <strong>{admin.name}</strong>
                    {admin.plans?.[0]?.planName && (
                      <span className="text-muted ms-2">— {admin.plans[0].planName}</span>
                    )}
                  </td>

                  <td onClick={() => handleView(admin)}>{admin.adminId}</td>
                  <td onClick={() => handleView(admin)}><small className="text-muted">{admin.address}</small></td>

                  <td onClick={() => handleView(admin)}>
                    <div><strong>{admin.phone}</strong></div>
                    <small className="text-muted">{admin.role}</small>
                  </td>

                  <td onClick={() => handleView(admin)}>{getStatusBadge(admin.status)}</td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-outline-secondary" onClick={(e) => { e.stopPropagation(); handleView(admin); }}>
                        <FaEye size={14} />
                      </button>

                      <button className="btn btn-sm btn-outline-primary" onClick={(e) => { e.stopPropagation(); handleEdit(admin); }}>
                        <FaEdit size={14} />
                      </button>

                      <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClick(admin); }}>
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

      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">

              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{getModalTitle()}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body p-4">
                <AdminForm
                  mode={modalType}
                  admin={selectedAdmin}
                  onCancel={closeModal}
                  onSubmit={(payload) => {
                    alert(`${modalType === 'add' ? 'New admin added' : 'Admin updated'} successfully!`);
                    closeModal();
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeDeleteModal}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">

              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button className="btn-close" onClick={closeDeleteModal}></button>
              </div>

              <div className="modal-body text-center py-4">
                <h5>Are you sure?</h5>
                <p className="text-muted">
                  This will permanently delete <strong>{selectedAdmin?.name}</strong>.
                </p>
              </div>

              <div className="modal-footer border-0 justify-content-center pb-4">
                <button className="btn btn-outline-secondary px-4" onClick={closeDeleteModal}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};


// ---------------------------
// AdminForm (previously OwnerForm) stays same except labels changed to Admin
// ---------------------------
const AdminForm = ({ mode, admin, onCancel, onSubmit }) => {
  const isView = mode === 'view';
  const isAdd = mode === 'add';

  const initialActive = (admin?.status || 'Inactive') === 'Active';

  const planOptions = {
    Gold: { price: "1200", duration: "12 Months", description: "Best premium plan with full access" },
    Silver: { price: "800", duration: "6 Months", description: "Affordable mid-range plan for regular users" },
    Basic: { price: "500", duration: "3 Months", description: "Starter plan for new gym members" }
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
    const fd = new FormData(e.currentTarget);
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
      <div className="row mb-3 g-3">
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

      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Address *</label>
          <input name="address" className="form-control" defaultValue={admin?.address || ""} readOnly={isView} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone *</label>
          <input name="phone" className="form-control" defaultValue={admin?.phone || ""} readOnly={isView} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input name="email" className="form-control" defaultValue={admin?.email || ""} readOnly={isView} />
        </div>
      </div>

      <h6 className="fw-semibold mb-3">Login Information</h6>
      <div className="row mb-3 g-3">
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

      <h6 className="fw-semibold mt-4 mb-3">Plans Information</h6>
      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Plan Name *</label>
          <select name="planName" className="form-control" value={selectedPlan} onChange={handlePlanChange} disabled={isView}>
            <option value="">Select Plan</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Price *</label>
          <input name="price" className="form-control" value={planPrice} readOnly />
        </div>
        <div className="col-md-6">
          <label className="form-label">Duration *</label>
          <input name="duration" className="form-control" value={planDuration} readOnly />
        </div>
        <div className="col-md-12">
          <label className="form-label">Description *</label>
          <textarea name="description" className="form-control" rows="2" value={planDescription} onChange={(e) => setPlanDescription(e.target.value)} readOnly={isView}></textarea>
        </div>
      </div>

      <div className="mb-4 mt-3">
        <label className="form-label me-3">Status</label>
        <div className="form-check form-switch">
          <input name="statusToggle" type="checkbox" className="form-check-input" defaultChecked={initialActive} disabled={isView} />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary px-4" type="button" onClick={onCancel}>Close</button>
        {!isView && <button className="btn px-4" style={{ backgroundColor: '#6EB2CC', color: '#fff' }} type="submit">{mode === 'add' ? "Save Admin" : "Update Admin"}</button>}
      </div>
    </form>
  );
};

export default SuperAdminAdmin;
