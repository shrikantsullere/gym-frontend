import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const BUTTON_COLOR = "#6EB2CC";
const DELETE_COLOR = "#dc3545";

const sampleBranches = [
  { id: 1, name: "Central Gym", address: "MG Road, Pune", phone: "+91 98765 43210", manager: "Amit", status: "Active" },
  { id: 2, name: "Eastside Fitness", address: "Kharadi, Pune", phone: "+91 91234 56789", manager: "Neha", status: "Active" },
  { id: 3, name: "North Gym", address: "Aundh, Pune", phone: "+91 99876 54321", manager: "Rohit", status: "Inactive" }
];

const BranchForm = ({ initial = {}, onSave, onCancel }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    address: initial.address || "",
    phone: initial.phone || "",
    manager: initial.manager || "",
    status: initial.status || "Active",
  });

  useEffect(() => {
    setForm({
      name: initial.name || "",
      address: initial.address || "",
      phone: initial.phone || "",
      manager: initial.manager || "",
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
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Branch name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Manager</label>
          <input name="manager" value={form.manager} onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input name="address" value={form.address} onChange={handleChange} className="form-control" />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-select">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn" onClick={onCancel} style={{ background: "#f0f0f0", color: "#333" }}>
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
      (b.manager || "").toLowerCase().includes(q) ||
      (b.phone || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mt-4">

      {/* TOP SECTION + BUTTON NEXT TO SEARCH */}
      {/* TOP SECTION */}
<div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">

  <div>
    <h4 className="mb-0">Branches</h4>
    <small className="text-muted">Manage your gym branches</small>
  </div>

  {/* SEARCH + ADD BUTTON SAME LINE */}
  <div className="d-flex align-items-center gap-2" style={{ flexGrow: 1, maxWidth: 500 }}>

    <input
      className="form-control"
      placeholder="Search branches..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ minWidth: 200 }}
    />

    <button
      className="btn text-white d-flex align-items-center gap-2"
      style={{ background: BUTTON_COLOR, whiteSpace: "nowrap" }}
      onClick={openAdd}
    >
      <FaPlus />
      <span className="d-none d-sm-inline">Add Branch</span>
    </button>

  </div>
</div>

      {/* RESPONSIVE TABLE → CARD */}
      <div className="d-none d-md-block card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Manager</th>
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
                  <td>{b.manager}</td>
                  <td>
                    <span className={`badge ${b.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-3">
                      <FaEye style={{ cursor: "pointer", color: BUTTON_COLOR }} onClick={() => openView(b)} />
                      <FaEdit style={{ cursor: "pointer", color: BUTTON_COLOR }} onClick={() => openEdit(b)} />
                      <FaTrash style={{ cursor: "pointer", color: DELETE_COLOR }} onClick={() => handleDelete(b.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-4">No branches found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="d-md-none">
        <div className="row g-3">
          {filtered.map((b) => (
            <div className="col-12" key={b.id}>
              <div className="card shadow-sm p-3">
                <h5>{b.name}</h5>
                <p className="mb-1"><strong>Address:</strong> {b.address}</p>
                <p className="mb-1"><strong>Phone:</strong> {b.phone}</p>
                <p className="mb-1"><strong>Manager:</strong> {b.manager}</p>
                <p><strong>Status:</strong> {b.status}</p>

                <div className="d-flex gap-4 mt-2">
                  <FaEye style={{ cursor: "pointer", color: BUTTON_COLOR }} onClick={() => openView(b)} />
                  <FaEdit style={{ cursor: "pointer", color: BUTTON_COLOR }} onClick={() => openEdit(b)} />
                  <FaTrash style={{ cursor: "pointer", color: DELETE_COLOR }} onClick={() => handleDelete(b.id)} />
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && <p className="text-center mt-3">No branches found</p>}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="d-flex justify-content-center align-items-start"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1050,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="bg-white rounded shadow mt-5"
            style={{ width: "min(900px, 95%)", maxHeight: "90%", overflow: "auto" }}
          >
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {mode === "add" ? "Add Branch" : mode === "edit" ? "Edit Branch" : "Branch Details"}
              </h5>
              <button className="btn btn-sm" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>

            <div className="p-3">
              {mode === "view" ? (
                <div>
                  <h5>{selected?.name}</h5>
                  <p><strong>Address:</strong> {selected?.address}</p>
                  <p><strong>Phone:</strong> {selected?.phone}</p>
                  <p><strong>Manager:</strong> {selected?.manager}</p>
                  <p><strong>Status:</strong> {selected?.status}</p>
                </div>
              ) : (
                <BranchForm initial={selected || {}} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuperAdminBranches;
