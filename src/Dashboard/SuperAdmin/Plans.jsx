import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import axiosInstance from "../../Api/axiosInstance";

const MembershipPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // Added loading state for delete operation

  // Form fields
  const [planName, setPlanName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [duration, setDuration] = useState("90");
  const [status, setStatus] = useState("Active");
  const [descriptions, setDescriptions] = useState([""]);
  const [category, setCategory] = useState("GYM"); // Added category field

  // Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get("/plans");

      if (res.data.success) {
        const mapped = res.data.plans.map((p) => ({
          id: p.id,
          planName: p.name,
          basePrice: p.price,
          duration: p.duration,
          status: p.status === "ACTIVE" ? "Active" : "Inactive",
          descriptions: p.description ? [p.description] : [""],
          category: p.category || "GYM" // Added category mapping
        }));
        setPlans(mapped);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load plans!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isDeleteModalOpen ? "hidden" : "auto";
  }, [isModalOpen, isDeleteModalOpen]);

  // Reset form
  const resetForm = () => {
    setPlanName("");
    setBasePrice("");
    setDuration("90");
    setStatus("Active");
    setDescriptions([""]);
    setCategory("GYM"); // Reset category
  };

  // ---------------- Open Modals ----------------
  const openAddModal = () => {
    setModalType("add");
    resetForm();
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setModalType("edit");
    setSelectedPlan(plan);

    setPlanName(plan.planName);
    setBasePrice(plan.basePrice);
    setDuration(plan.duration.toString());
    setStatus(plan.status);
    setDescriptions(plan.descriptions);
    setCategory(plan.category || "GYM"); // Set category from plan data

    setIsModalOpen(true);
  };

  const openViewModal = (plan) => {
    setModalType("view");
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const openDeleteModal = (plan) => {
    setSelectedPlan(plan);
    setIsDeleteModalOpen(true);
  };

  // ---------------- Description handlers ----------------
  const addDescription = () => setDescriptions([...descriptions, ""]);

  const removeDescription = (index) => {
    const updated = descriptions.filter((_, i) => i !== index);
    setDescriptions(updated);
  };

  const updateDescription = (i, val) => {
    const updated = [...descriptions];
    updated[i] = val;
    setDescriptions(updated);
  };

  // ---------------- Save/Create/Update ----------------
  const handleSavePlan = async () => {
    if (!planName.trim() || !basePrice || Number(basePrice) <= 0) {
      alert("Enter valid plan name and price");
      return;
    }

    const payload = {
      name: planName,
      price: Number(basePrice),
      duration,
      description: descriptions[0] || "",
      status: status === "Active" ? "ACTIVE" : "INACTIVE",
      category: category // Added category to payload
    };

    setSaving(true);

    try {
      if (modalType === "add") {
        await axiosInstance.post("/plans/create", payload);
        alert("Plan created successfully!");
      } else {
        // Updated to use the correct PUT endpoint
        const response = await axiosInstance.put(`/plans/update/${selectedPlan.id}`, payload);
        
        if (response.data.success) {
          // Update the plan in the local state with the response data
          const updatedPlans = plans.map(plan => 
            plan.id === selectedPlan.id 
              ? {
                  ...plan,
                  id: response.data.plan.id,
                  planName: response.data.plan.name,
                  basePrice: response.data.plan.price,
                  duration: response.data.plan.duration,
                  status: response.data.plan.status === "ACTIVE" ? "Active" : "Inactive",
                  descriptions: [response.data.plan.description],
                  category: response.data.plan.category
                }
              : plan
          );
          setPlans(updatedPlans);
          alert("Plan updated successfully!");
        } else {
          throw new Error('Failed to update plan');
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save plan: " + (error.response?.data?.message || ""));
    } finally {
      setSaving(false);
    }
  };

  // ---------------- Delete ----------------
  const deletePlan = async () => {
    if (!selectedPlan) return;
    
    setDeleting(true);
    
    try {
      // Updated to use the correct DELETE endpoint
      const response = await axiosInstance.delete(`/plans/delete/${selectedPlan.id}`);
      
      if (response.data.success) {
        // Remove the plan from the local state
        setPlans(plans.filter(plan => plan.id !== selectedPlan.id));
        alert("Plan deleted successfully!");
        setIsDeleteModalOpen(false);
      } else {
        throw new Error('Failed to delete plan');
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete plan: " + (error.response?.data?.message || ""));
    } finally {
      setDeleting(false);
      setSelectedPlan(null);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="container-fluid p-3" style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">💰 Plans & Pricing</h3>
        <button className="btn btn-primary" style={{ background: "#6EB2CC" }} onClick={openAddModal}>
          + Add Plan
        </button>
      </div>

      {/* Table */}
      <div className="card shadow-sm p-0 border-0">
        <div className="p-3 fw-semibold border-bottom">All Plans</div>

        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr className="text-muted small text-uppercase">
                <th>Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Category</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center py-3">Loading...</td></tr>
              ) : plans.length === 0 ? (
                <tr><td colSpan="7" className="text-center text-muted py-4">No plans found</td></tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.planName}</td>
                    <td>₹{plan.basePrice}</td>
                    <td>{plan.duration}</td>
                    <td>{plan.category}</td>
                    <td>
                      <span className={`badge ${plan.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>{plan.descriptions[0]?.slice(0, 25)}...</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => openViewModal(plan)}>
                          <FaEye size={13} />
                        </button>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => openEditModal(plan)}>
                          <FaEdit size={13} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => openDeleteModal(plan)}>
                          <FaTrashAlt size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit/View Modal */}
      {isModalOpen && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setIsModalOpen(false)}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ borderRadius: "14px" }}>
              <div className="modal-header border-0">
                <h5 className="fw-bold">
                  {modalType === "add" ? "Add New Plan" : modalType === "edit" ? "Edit Plan" : "Plan Details"}
                </h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>

              <div className="modal-body">
                <div className="bg-info text-white p-2 mb-3 rounded" style={{ background: "#6EB2CC" }}>
                  {modalType === "view" ? "Plan Details" : "Plan Information"}
                </div>

                {/* Form */}
                <label className="form-label">Plan Name</label>
                <input
                  className="form-control mb-2"
                  value={planName}
                  disabled={modalType === "view"}
                  onChange={(e) => setPlanName(e.target.value)}
                />

                <label className="form-label">Price (₹)</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={basePrice}
                  disabled={modalType === "view"}
                  onChange={(e) => setBasePrice(e.target.value)}
                />

                <label className="form-label">Duration</label>
                <input
                  className="form-control mb-2"
                  value={duration}
                  disabled={modalType === "view"}
                  onChange={(e) => setDuration(e.target.value)}
                />

                <label className="form-label">Category</label>
                <select
                  className="form-select mb-2"
                  value={category}
                  disabled={modalType === "view"}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="GYM">Gym</option>
                  <option value="YOGA">Yoga</option>
                  <option value="CARDIO">Cardio</option>
                  <option value="PERSONAL_TRAINING">Personal Training</option>
                </select>

                <label className="form-label">Status</label>
                <select
                  className="form-select mb-3"
                  value={status}
                  disabled={modalType === "view"}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <label className="form-label">Description</label>

                {descriptions.map((desc, i) => (
                  <div key={i} className="d-flex gap-2 mb-2">
                    <textarea
                      className="form-control"
                      rows="2"
                      value={desc}
                      disabled={modalType === "view"}
                      onChange={(e) => updateDescription(i, e.target.value)}
                    />

                    {modalType !== "view" && descriptions.length > 1 && (
                      <button className="btn btn-sm btn-danger" onClick={() => removeDescription(i)}>X</button>
                    )}
                  </div>
                ))}

                {modalType !== "view" && (
                  <button className="btn btn-sm btn-info" style={{ background: "#6EB2CC" }} onClick={addDescription}>
                    + Add More
                  </button>
                )}
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>

                {modalType !== "view" && (
                  <button className="btn btn-primary" style={{ background: "#6EB2CC" }} onClick={handleSavePlan}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <h5>Delete This Plan?</h5>
                <p className="text-muted">This action cannot be undone.</p>

                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)} disabled={deleting}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={deletePlan} disabled={deleting}>
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPlans;