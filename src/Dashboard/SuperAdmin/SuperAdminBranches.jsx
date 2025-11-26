import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SuperAdminBranches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'view' | 'edit'
  const [selectedBranch, setSelectedBranch] = useState(null);

  // --- Handlers
  const handleAddNew = () => {
    setModalType('add');
    setSelectedBranch(null);
    setIsModalOpen(true);
  };

  const handleView = (branch) => {
    setModalType('view');
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleEdit = (branch) => {
    setModalType('edit');
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (branch) => {
    setSelectedBranch(branch);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBranch) {
      alert(`Branch "${selectedBranch.name}" has been deleted.`);
      // TODO: call DELETE /branches/:id
    }
    setIsDeleteModalOpen(false);
    setSelectedBranch(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBranch(null);
  };

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isDeleteModalOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, isDeleteModalOpen]);

  // --- Sample data
  const branches = [
    {
      id: 1,
      name: "Downtown Branch",
      code: "AN01",
      address: "123 Main Street, Downtown, NY 10001",
      manager: { name: "Alex Martinez", role: "Branch Manager", initials: "AM" },
      status: "Active",
      phone: "+1 555-123-4567",
      email: "downtown@branch.com",
      hours: {
        weekdays: { from: "06:00", to: "22:00" },
        saturday: { from: "07:00", to: "21:00" },
        sunday: { from: "08:00", to: "20:00" },
      },
    },
    {
      id: 2,
      name: "Uptown Fitness",
      code: "AN02",
      address: "456 Park Ave, Uptown, NY 10028",
      manager: { name: "Sarah Kim", role: "Senior Manager", initials: "SK" },
      status: "Active",
      phone: "+1 555-987-6543",
      email: "uptown@branch.com",
      hours: {
        weekdays: { from: "06:00", to: "22:00" },
        saturday: { from: "07:00", to: "21:00" },
        sunday: { from: "08:00", to: "20:00" },
      },
    },
    {
      id: 3,
      name: "Brooklyn Studio",
      code: "AN03",
      address: "789 Flatbush Ave, Brooklyn, NY 11201",
      manager: { name: "Michael Brown", role: "Branch Manager", initials: "MB" },
      status: "Maintenance",
      phone: "+1 555-456-7890",
      email: "brooklyn@branch.com",
      hours: {
        weekdays: { from: "06:00", to: "22:00" },
        saturday: { from: "07:00", to: "21:00" },
        sunday: { from: "08:00", to: "20:00" },
      },
    },
    {
      id: 4,
      name: "Queens Health Hub",
      code: "AN04",
      address: "321 Roosevelt Ave, Queens, NY 11372",
      manager: { name: "Emma Davis", role: "Branch Manager", initials: "ED" },
      status: "Inactive", // fixed duplicate
      phone: "+1 555-321-0987",
      email: "queens@branch.com",
      hours: {
        weekdays: { from: "00:00", to: "23:59" },
        saturday: { from: "00:00", to: "23:59" },
        sunday: { from: "00:00", to: "23:59" },
      },
    },
  ];

  // --- UI helpers
  const getStatusBadge = (status) => {
    const badgeClasses = {
      Active: "bg-success-subtle text-success-emphasis",
      Inactive: "bg-danger-subtle text-danger-emphasis",
      Maintenance: "bg-warning-subtle text-warning-emphasis",
    };
    return (
      <span className={`badge rounded-pill ${badgeClasses[status] || 'bg-secondary'} px-3 py-1`}>
        {status}
      </span>
    );
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'add': return 'Add New Branch';
      case 'edit': return 'Edit Branch';
      case 'view': return 'Branch Details';
      default: return 'Branch Management';
    }
  };

  return (
    <div className="p-3 p-md-2">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          <h2 className="fw-bold h3 h2-md">Branch Management</h2>
          <p className="text-muted mb-0">Manage all gym branches, their information, and operational details.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end">
          <button
            className="btn w-100 w-lg-auto"
            style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '1rem', fontWeight: '500' }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus me-2"></i> Add New Branch
          </button>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="row mb-4 g-3">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="input-group">
            <span className="input-group-text bg-light border">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input type="text" className="form-control border" placeholder="Search branches..." />
          </div>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <button className="btn btn-outline-secondary w-100">
            <i className="fas fa-filter me-1"></i> Filter
          </button>
        </div>
        <div className="col-6 col-md-3 col-lg-2">
          <button className="btn btn-outline-secondary w-100">
            <i className="fas fa-file-export me-1"></i> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-semibold">BRANCH NAME</th>
                <th className="fw-semibold">CODE</th>
                <th className="fw-semibold">ADDRESS</th>
                <th className="fw-semibold">MANAGER</th>
                <th className="fw-semibold">STATUS</th>
                <th className="fw-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="hover-row" style={{ cursor: 'pointer' }}>
                  <td onClick={() => handleView(branch)}><strong>{branch.name}</strong></td>
                  <td onClick={() => handleView(branch)}>{branch.code}</td>
                  <td onClick={() => handleView(branch)}><small className="text-muted d-block">{branch.address}</small></td>
                  <td onClick={() => handleView(branch)}>
                    <div className="d-flex align-items-center gap-2">
                      <Avatar initials={branch.manager.initials} />
                      <div>
                        <div><strong>{branch.manager.name}</strong></div>
                        <div><small className="text-muted">{branch.manager.role}</small></div>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => handleView(branch)}>{getStatusBadge(branch.status)}</td>
                 
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-outline-secondary" title="View" onClick={(e) => { e.stopPropagation(); handleView(branch); }}>
                        <FaEye size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(branch); }}>
                        <FaEdit size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(branch); }}>
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
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{getModalTitle()}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body p-3 p-md-4">
                <BranchForm
                  mode={modalType}
                  branch={selectedBranch}
                  onCancel={closeModal}
                  onSubmit={(payload) => {
                    // TODO: POST/PUT to API
                    alert(`${modalType === 'add' ? 'New branch added' : 'Branch updated'} successfully!`);
                    closeModal();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeDeleteModal}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="display-6 text-danger mb-3"><i className="fas fa-exclamation-triangle"></i></div>
                <h5>Are you sure?</h5>
                <p className="text-muted">
                  This will permanently delete <strong>{selectedBranch?.name}</strong>.<br />This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center pb-4">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={closeDeleteModal}>Cancel</button>
                <button type="button" className="btn btn-danger px-4" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Avatar circle helper */
const Avatar = ({ initials }) => {
  const bg = getInitialColor(initials);
  return (
    <div
      className="rounded-circle text-white d-flex align-items-center justify-content-center"
      style={{ width: 32, height: 32, fontSize: '0.85rem', fontWeight: 'bold', backgroundColor: bg }}
    >
      {initials}
    </div>
  );
};

/** Unified Form for add/view/edit */
const BranchForm = ({ mode, branch, onCancel, onSubmit }) => {
  const isView = mode === 'view';

  // We’ll use uncontrolled inputs with defaultValue + disabled/readOnly for simplicity
  // If you want full controlled state, we can convert later.

  // Compute initial toggle state for status
  const initialActive = (branch?.status || 'Inactive') === 'Active';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) {
      onCancel();
      return;
    }
    // Collect values (quick grab via FormData)
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    // Normalize nested fields
    const result = {
      name: payload.name,
      code: payload.code,
      address: payload.address,
      manager: { name: payload.managerName || '', role: 'Branch Manager', initials: (payload.managerName || 'NA').split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() },
      phone: payload.phone,
      email: payload.email,
      status: payload.statusToggle ? 'Active' : 'Inactive',
      hours: {
        weekdays: { from: payload.wdFrom, to: payload.wdTo },
        saturday: { from: payload.satFrom, to: payload.satTo },
        sunday: { from: payload.sunFrom, to: payload.sunTo },
      },
      // Optional login info (not persisted securely here)
      username: payload.username,
      // NEVER store plaintext passwords in real apps; this is just placeholder UI.
    };
    onSubmit(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: Branch Name & Code */}
      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Branch Name <span className="text-danger">*</span></label>
          <input
            name="name"
            type="text"
            className="form-control rounded-3"
            placeholder="Enter branch name"
            defaultValue={branch?.name || ''}
            readOnly={isView}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Code <span className="text-danger">*</span></label>
          <input
            name="code"
            type="text"
            className="form-control rounded-3"
            placeholder="Enter branch code"
            defaultValue={branch?.code || ''}
            readOnly={isView}
          />
        </div>
      </div>

      {/* Address & Manager */}
      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Address <span className="text-danger">*</span></label>
          <input
            name="address"
            type="text"
            className="form-control rounded-3"
            placeholder="Enter full address"
            defaultValue={branch?.address || ''}
            readOnly={isView}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Manager <span className="text-danger">*</span></label>
          <input
            name="managerName"
            type="text"
            className="form-control rounded-3"
            placeholder="Enter manager name"
            defaultValue={branch?.manager?.name || ''}
            readOnly={isView}
          />
        </div>
      </div>

      {/* Phone & Email */}
      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Phone Number</label>
          <input
            name="phone"
            type="tel"
            className="form-control rounded-3"
            placeholder="e.g., +1 555-123-4567"
            defaultValue={branch?.phone || ''}
            readOnly={isView}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control rounded-3"
            placeholder="e.g., contact@branch.com"
            defaultValue={branch?.email || ''}
            readOnly={isView}
          />
        </div>
      </div>

      {/* Login Information */}
      <h6 className="mb-3 fw-semibold">Login Information</h6>
      <div className="row mb-3 g-3">
        <div className="col-md-6">
          <label className="form-label">Username *</label>
          <input name="username" type="text" className="form-control rounded-3" defaultValue={branch?.username || ''} readOnly={isView} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Password *</label>
          <input name="password" type="password" className="form-control rounded-3" defaultValue="" readOnly={isView} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Display Image</label>
          <input name="avatar" type="file" className="form-control rounded-3" disabled={isView} />
        </div>
      </div>

      {/* Operating Hours */}
      <div className="mb-4">
        <h6 className="fw-semibold mb-3">Operating Hours</h6>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label d-block">Weekdays (Mon - Fri)</label>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <input
                name="wdFrom"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.weekdays?.from || '06:00'}
                readOnly={isView}
              />
              <span>to</span>
              <input
                name="wdTo"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.weekdays?.to || '22:00'}
                readOnly={isView}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label d-block">Saturday</label>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <input
                name="satFrom"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.saturday?.from || '07:00'}
                readOnly={isView}
              />
              <span>to</span>
              <input
                name="satTo"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.saturday?.to || '21:00'}
                readOnly={isView}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label d-block">Sunday</label>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <input
                name="sunFrom"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.sunday?.from || '08:00'}
                readOnly={isView}
              />
              <span>to</span>
              <input
                name="sunTo"
                type="time"
                className="form-control form-control-sm rounded-3"
                style={{ maxWidth: '120px' }}
                defaultValue={branch?.hours?.sunday?.to || '20:00'}
                readOnly={isView}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        <div className="d-flex align-items-center">
          <label className="form-label me-3 mb-0">Status</label>
          <div className="form-check form-switch">
            <input
              name="statusToggle"
              type="checkbox"
              className="form-check-input"
              id="statusToggle"
              defaultChecked={initialActive}
              disabled={isView}
            />
            <label className="form-check-label ms-2" htmlFor="statusToggle">
              {initialActive ? 'Active' : 'Inactive'}
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={onCancel}>Close</button>
        {!isView && (
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 500 }}
          >
            {mode === 'add' ? 'Save Branch' : 'Update Branch'}
          </button>
        )}
      </div>
    </form>
  );
};

// Helper function for avatar bg color
const getInitialColor = (initials) => {
  const colors = ['#6EB2CC', '#F4B400', '#E84A5F', '#4ECDC4', '#96CEB4', '#FFEAA7'];
  const code = (initials && initials.charCodeAt && initials.charCodeAt(0)) || 65;
  return colors[code % colors.length];
};

export default SuperAdminBranches;
