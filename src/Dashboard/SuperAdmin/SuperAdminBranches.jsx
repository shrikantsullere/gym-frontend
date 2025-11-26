import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SuperAdminBranches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' | 'edit' | 'view'
  const [selectedCompany, setSelectedCompany] = useState(null);

  // --- Handlers
  const handleAddNew = () => {
    setModalType('add');
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleView = (company) => {
    setModalType('view');
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleEdit = (company) => {
    setModalType('edit');
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCompany) {
      alert(`Company "${selectedCompany.name}" has been deleted.`);
      // TODO: call DELETE /companies/:id
    }
    setIsDeleteModalOpen(false);
    setSelectedCompany(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCompany(null);
  };

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = (isModalOpen || isDeleteModalOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen, isDeleteModalOpen]);

  // --- Sample data
  const companies = [
    {
      id: 1,
      name: "Global Fitness Co.",
      code: "GC01",
      address: "100 Main Street, NY",
      manager: { name: "Alex Martinez", role: "Company Manager", initials: "AM" },
      status: "Active",
      phone: "+1 555-123-4567",
      email: "contact@globalfitness.com",
    },
    {
      id: 2,
      name: "FitLife Corp.",
      code: "FL02",
      address: "200 Park Ave, NY",
      manager: { name: "Sarah Kim", role: "Senior Manager", initials: "SK" },
      status: "Active",
      phone: "+1 555-987-6543",
      email: "info@fitlifecorp.com",
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
      case 'add': return 'Add New Company';
      case 'edit': return 'Edit Company';
      case 'view': return 'Company Details';
      default: return 'Company Management';
    }
  };

  return (
    <div className="p-3 p-md-2">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-lg-8 mb-3 mb-lg-0">
          <h2 className="fw-bold h3 h2-md">Company Management</h2>
          <p className="text-muted mb-0">Manage all companies, their information, and operational details.</p>
        </div>
        <div className="col-12 col-lg-4 text-lg-end">
          <button
            className="btn w-100 w-lg-auto"
            style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '1rem', fontWeight: '500' }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus me-2"></i> Add New Company
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-semibold">COMPANY NAME</th>
                <th className="fw-semibold">CODE</th>
                <th className="fw-semibold">ADDRESS</th>
                <th className="fw-semibold">MANAGER</th>
                <th className="fw-semibold">STATUS</th>
                <th className="fw-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover-row" style={{ cursor: 'pointer' }}>
                  <td onClick={() => handleView(company)}><strong>{company.name}</strong></td>
                  <td onClick={() => handleView(company)}>{company.code}</td>
                  <td onClick={() => handleView(company)}><small className="text-muted d-block">{company.address}</small></td>
                  <td onClick={() => handleView(company)}>
                    <div className="d-flex align-items-center gap-2">
                      <Avatar initials={company.manager.initials} />
                      <div>
                        <div><strong>{company.manager.name}</strong></div>
                        <div><small className="text-muted">{company.manager.role}</small></div>
                      </div>
                    </div>
                  </td>
                  <td onClick={() => handleView(company)}>{getStatusBadge(company.status)}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <button className="btn btn-sm btn-outline-secondary" title="View" onClick={(e) => { e.stopPropagation(); handleView(company); }}>
                        <FaEye size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-primary" title="Edit" onClick={(e) => { e.stopPropagation(); handleEdit(company); }}>
                        <FaEdit size={14} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={(e) => { e.stopPropagation(); handleDeleteClick(company); }}>
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

      {/* Modals */}
      {isModalOpen && (
        <Modal
          title={getModalTitle()}
          onClose={closeModal}
          content={
            <CompanyForm
              mode={modalType}
              company={selectedCompany}
              onCancel={closeModal}
              onSubmit={(payload) => {
                alert(`${modalType === 'add' ? 'New company added' : 'Company updated'} successfully!`);
                closeModal();
              }}
            />
          }
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          name={selectedCompany?.name}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

// Avatar
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

// Company Form
const CompanyForm = ({ mode, company, onCancel, onSubmit }) => {
  // SuperAdmin: always editable
  const isView = false; 

  const initialActive = (company?.status || 'Inactive') === 'Active';

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const result = {
      name: payload.name,
      code: payload.code,
      address: payload.address,
      manager: { name: payload.managerName || '', role: 'Company Manager', initials: (payload.managerName || 'NA').split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() },
      phone: payload.phone,
      email: payload.email,
      status: payload.statusToggle ? 'Active' : 'Inactive',
      username: payload.username,
    };
    onSubmit(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Company Name <span className="text-danger">*</span></label>
          <input name="name" type="text" className="form-control rounded-3" defaultValue={company?.name || ''} readOnly={isView} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Code <span className="text-danger">*</span></label>
          <input name="code" type="text" className="form-control rounded-3" defaultValue={company?.code || ''} readOnly={isView} />
        </div>
      </div>

      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Address <span className="text-danger">*</span></label>
          <input name="address" type="text" className="form-control rounded-3" defaultValue={company?.address || ''} readOnly={isView} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Manager <span className="text-danger">*</span></label>
          <input name="managerName" type="text" className="form-control rounded-3" defaultValue={company?.manager?.name || ''} readOnly={isView} />
        </div>
      </div>

      <div className="row mb-3 g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Phone Number</label>
          <input name="phone" type="tel" className="form-control rounded-3" defaultValue={company?.phone || ''} readOnly={isView} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control rounded-3" defaultValue={company?.email || ''} readOnly={isView} />
        </div>
      </div>

      <div className="d-flex align-items-center mb-4">
        <label className="form-label me-3 mb-0">Status</label>
        <div className="form-check form-switch">
          <input name="statusToggle" type="checkbox" className="form-check-input" defaultChecked={initialActive} disabled={isView} />
          <label className="form-check-label ms-2">{initialActive ? 'Active' : 'Inactive'}</label>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={onCancel}>Close</button>
        <button type="submit" className="btn" style={{ backgroundColor: '#6EB2CC', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: 500 }}>
          {mode === 'add' ? 'Save Company' : 'Update Company'}
        </button>
      </div>
    </form>
  );
};

// Delete Modal
const DeleteModal = ({ name, onCancel, onConfirm }) => (
  <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onCancel}>
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header border-0 pb-0">
          <h5 className="modal-title fw-bold">Confirm Deletion</h5>
          <button type="button" className="btn-close" onClick={onCancel}></button>
        </div>
        <div className="modal-body text-center py-4">
          <div className="display-6 text-danger mb-3"><i className="fas fa-exclamation-triangle"></i></div>
          <h5>Are you sure?</h5>
          <p className="text-muted">
            This will permanently delete <strong>{name}</strong>.<br />This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer border-0 justify-content-center pb-4">
          <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-danger px-4" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  </div>
);

// Avatar color helper
const getInitialColor = (initials) => {
  const colors = ['#6EB2CC', '#F4B400', '#E84A5F', '#4ECDC4', '#96CEB4', '#FFEAA7'];
  const code = (initials && initials.charCodeAt && initials.charCodeAt(0)) || 65;
  return colors[code % colors.length];
};

// Simple reusable modal wrapper
const Modal = ({ title, content, onClose }) => (
  <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header border-0 pb-0">
          <h5 className="modal-title fw-bold">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body p-3 p-md-4">{content}</div>
      </div>
    </div>
  </div>
);

export default SuperAdminBranches;
