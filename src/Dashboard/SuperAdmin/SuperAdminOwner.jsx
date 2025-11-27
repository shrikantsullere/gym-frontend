import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SuperAdminOwner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [selectedOwner, setSelectedOwner] = useState(null);

  // Handlers
  const handleAddNew = () => {
    setModalType('add');
    setSelectedOwner(null);
    setIsModalOpen(true);
  };

  const handleView = (owner) => {
    setModalType('view');
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const handleEdit = (owner) => {
    setModalType('edit');
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (owner) => {
    setSelectedOwner(owner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedOwner) {
      alert(`Owner "${selectedOwner.name}" has been deleted.`);
    }
    setIsDeleteModalOpen(false);
    setSelectedOwner(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOwner(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOwner(null);
  };

  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isDeleteModalOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, isDeleteModalOpen]);

  // --- SAMPLE OWNER DATA
  const owners = [
    {
      id: 1,
      name: "John Anderson",
      ownerId: "OWN01",
      address: "123 Main Street, New York",
      role: "Primary Owner",
      phone: "+1 555-123-4567",
      email: "john@owner.com",
      status: "Active",
      username: "john_admin",
    },
    {
      id: 2,
      name: "Emma Watson",
      ownerId: "OWN02",
      address: "456 Park Avenue, New York",
      role: "Co-Owner",
      phone: "+1 555-987-6543",
      email: "emma@owner.com",
      status: "Inactive",
      username: "emma_owner",
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
      case 'add': return 'Add New Owner';
      case 'edit': return 'Edit Owner';
      case 'view': return 'Owner Details';
      default: return 'Owner Management';
    }
  };

  return (
    <div className="p-3 p-md-2">
      
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          <h2 className="fw-bold h3 h2-md">Owner Management</h2>
          <p className="text-muted mb-0">Manage all gym owners and their profile details.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end">
          <button
            className="btn w-100 w-lg-auto"
            style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '1rem', fontWeight: '500' }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus me-2"></i> Add New Owner
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>OWNER NAME</th>
                <th>OWNER ID</th>
                <th>ADDRESS</th>
                <th>CONTACT / ROLE</th>
                <th>STATUS</th>
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id} className="hover-row" style={{ cursor: 'pointer' }}>
                  <td onClick={() => handleView(owner)}><strong>{owner.name}</strong></td>
                  <td onClick={() => handleView(owner)}>{owner.ownerId}</td>
                  <td onClick={() => handleView(owner)}><small className="text-muted">{owner.address}</small></td>
                  
                  <td onClick={() => handleView(owner)}>
                    <div><strong>{owner.phone}</strong></div>
                    <small className="text-muted">{owner.role}</small>
                  </td>

                  <td onClick={() => handleView(owner)}>{getStatusBadge(owner.status)}</td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-outline-secondary" title="View" onClick={(e) => { e.stopPropagation(); handleView(owner); }}>
                        <FaEye size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(owner); }}>
                        <FaEdit size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(owner); }}>
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

      {/* MAIN MODAL */}
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{getModalTitle()}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body p-4">
                <OwnerForm
                  mode={modalType}
                  owner={selectedOwner}
                  onCancel={closeModal}
                  onSubmit={(payload) => {
                    alert(`${modalType === 'add' ? 'New owner added' : 'Owner updated'} successfully!`);
                    closeModal();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
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
                  This will permanently delete <strong>{selectedOwner?.name}</strong>.
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

// OWNER FORM
const OwnerForm = ({ mode, owner, onCancel, onSubmit }) => {
  const isView = mode === 'view';
  const initialActive = (owner?.status || 'Inactive') === 'Active';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return onCancel();

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    const payload = {
      name: data.name,
      ownerId: data.ownerId,
      address: data.address,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: data.password,
      status: data.statusToggle ? "Active" : "Inactive",
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Owner Name *</label>
          <input name="name" className="form-control" defaultValue={owner?.name || ""} readOnly={isView} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Owner ID *</label>
          <input name="ownerId" className="form-control" defaultValue={owner?.ownerId || ""} readOnly={isView} />
        </div>
      </div>

      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Address *</label>
          <input name="address" className="form-control" defaultValue={owner?.address || ""} readOnly={isView} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input name="phone" className="form-control" defaultValue={owner?.phone || ""} readOnly={isView} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input name="email" className="form-control" defaultValue={owner?.email || ""} readOnly={isView} />
        </div>
      </div>

      {/* LOGIN INFO */}
      <h6 className="fw-semibold mb-3">Login Information</h6>

      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Username *</label>
          <input name="username" className="form-control" defaultValue={owner?.username || ""} readOnly={isView} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password *</label>
          <input name="password" type="password" className="form-control" readOnly={isView} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Profile Image</label>
          <input type="file" className="form-control" disabled={isView} />
        </div>
      </div>

      {/* STATUS */}
      <div className="mb-4">
        <label className="form-label me-3">Status</label>
        <div className="form-check form-switch">
          <input
            name="statusToggle"
            type="checkbox"
            className="form-check-input"
            defaultChecked={initialActive}
            disabled={isView}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-outline-secondary px-4" type="button" onClick={onCancel}>Close</button>

        {!isView && (
          <button className="btn px-4" style={{ backgroundColor: '#6EB2CC', color: '#fff' }} type="submit">
            {mode === 'add' ? "Save Owner" : "Update Owner"}
          </button>
        )}
      </div>
    </form>
  );
};

export default SuperAdminOwner;
