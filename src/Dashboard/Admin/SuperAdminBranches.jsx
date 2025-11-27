import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BUTTON_COLOR = "#6EB2CC";
const DELETE_COLOR = "#dc3545";

const sampleBranches = [
  { id: 1, name: "Central Gym", address: "MG Road, Pune", phone: "+91 98765 43210", status: "Active" },
  { id: 2, name: "Eastside Fitness", address: "Kharadi, Pune", phone: "+91 91234 56789", status: "Active" },
  { id: 3, name: "North Gym", address: "Aundh, Pune", phone: "+91 99876 54321", status: "Inactive" }
];

const BranchForm = ({ initial = {}, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    address: initial.address || "",
    phone: initial.phone || "",
    status: initial.status || "Active",
  });

  useEffect(() => {
    setForm({
      name: initial.name || "",
      address: initial.address || "",
      phone: initial.phone || "",
      status: initial.status || "Active",
    });
  }, [initial]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Branch name required");
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Branch name</label>
        <input name="name" value={form.name} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input name="address" value={form.address} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="form-select">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn text-white" style={{ background: BUTTON_COLOR }}>
          Save
        </button>
      </div>
    </form>
  );
};

const SuperAdminBranches = () => {
  const [branches, setBranches] = useState(sampleBranches);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

  const openAdd = () => { setMode("add"); setSelected(null); setIsModalOpen(true); };
  const openEdit = (branch) => { setMode("edit"); setSelected(branch); setIsModalOpen(true); };
  const openView = (branch) => { setMode("view"); setSelected(branch); setIsModalOpen(true); };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSave = (form) => {
    if (mode === "add") {
      const newBranch = { id: Date.now(), ...form };
      setBranches((prev) => [newBranch, ...prev]);
    } else if (mode === "edit" && selected) {
      setBranches((prev) =>
        prev.map((b) => (b.id === selected.id ? { ...b, ...form } : b))
      );
    }
    setIsModalOpen(false);
  };

  const filtered = branches.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.address.toLowerCase().includes(q) ||
      (b.phone || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mt-4">
      {/* TOP SECTION */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="mb-2 mb-md-0">
          <h4 className="mb-1">Branches</h4>
          <small className="text-muted">Manage your gym branches</small>
        </div>

        {/* SEARCH + ADD BUTTON */}
        <div className="d-flex align-items-center gap-3" style={{ minWidth: "450px" }}>
          <div className="input-group flex-grow-1">
            <input
              className="form-control"
              placeholder="Search branches..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="btn text-white d-inline-flex align-items-center gap-2 px-4 py-2 shadow-sm"
            style={{ 
              background: BUTTON_COLOR,
              borderRadius: "6px",
              border: "none",
              transition: "all 0.2s ease-in-out",
              fontWeight: "500",
              minWidth: "140px",
              whiteSpace: "nowrap"
            }}
            onClick={openAdd}
          >
            <FaPlus size={14} />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="card shadow-sm d-none d-md-block">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.address}</td>
                  <td>{b.phone}</td>
                  <td>
                    <span className={`badge ${b.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => openView(b)}>
                        <FaEye />
                      </button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(b)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-4">No branches found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="d-md-none">
        {filtered.map((b) => (
          <div className="card shadow-sm mb-3" key={b.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title mb-0">{b.name}</h5>
                <span className={`badge ${b.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                  {b.status}
                </span>
              </div>
              <p className="card-text"><strong>Address:</strong> {b.address}</p>
              <p className="card-text"><strong>Phone:</strong> {b.phone}</p>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => openView(b)}>
                  <FaEye />
                </button>
                <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(b)}>
                  <FaEdit />
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(b.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <p className="text-center mt-3">No branches found</p>}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {mode === "add" ? "Add Branch" : mode === "edit" ? "Edit Branch" : "Branch Details"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                {mode === "view" ? (
                  <div>
                    <h5>{selected?.name}</h5>
                    <p><strong>Address:</strong> {selected?.address}</p>
                    <p><strong>Phone:</strong> {selected?.phone}</p>
                    <p><strong>Status:</strong> {selected?.status}</p>
                  </div>
                ) : (
                  <BranchForm initial={selected || {}} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminBranches;