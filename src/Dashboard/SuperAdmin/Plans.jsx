import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

const MembershipPlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [plans, setPlans] = useState([]);

  const [descriptions, setDescriptions] = useState(["Description 1"]);
  const [planName, setPlanName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (isModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen, isDeleteModalOpen]);

  // ---------------- MODALS ----------------

  const openAddModal = () => {
    setModalType("add");
    setSelectedPlan(null);
    setPlanName("");
    setBasePrice("");
    setBillingCycle("Monthly");
    setStatus("Active");
    setDescriptions(["Description 1"]);
    setIsModalOpen(true);
  };

  const openEditModal = (plan) => {
    setModalType("edit");
    setSelectedPlan(plan);
    setPlanName(plan.planName);
    setBasePrice(plan.basePrice);
    setBillingCycle(plan.billingCycle);
    setStatus(plan.status);
    setDescriptions(plan.descriptions || ["Description 1"]);
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

  const deletePlan = () => {
    setPlans((prev) => prev.filter((p) => p.id !== selectedPlan.id));
    setIsDeleteModalOpen(false);
  };

  // ---------------- DESCRIPTIONS ----------------
  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const updateDescription = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  // ---------------- SAVE PLAN ----------------
  const handleSavePlan = () => {
    const planData = {
      id: selectedPlan ? selectedPlan.id : Date.now(),
      planName,
      basePrice,
      billingCycle,
      status,
      descriptions,
    };

    if (modalType === "edit") {
      setPlans((prev) =>
        prev.map((p) => (p.id === selectedPlan.id ? planData : p))
      );
    } else {
      setPlans((prev) => [...prev, planData]);
    }

    setIsModalOpen(false);
  };

  return (
    <div
      className="container-fluid p-2 p-sm-3 p-md-4"
      style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}
    >
      {/* HEADER */}
      <div className="row mb-3 mb-md-4">
        <div className="col-12 col-md-8 mb-3 mb-md-0">
          <h2 className="fw-bold d-flex align-items-center gap-2 fs-4 fs-md-3">
            <span style={{ fontSize: "clamp(20px, 5vw, 28px)" }}>💰</span> 
            <span className="d-none d-sm-inline">Plans & Pricing</span>
            <span className="d-sm-none">Plans</span>
          </h2>
          <p className="text-muted mb-0 fs-6">
            Manage your subscription plans, pricing options.
          </p>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <button
            onClick={openAddModal}
            className="btn w-100 w-md-auto px-4 py-2"
            style={{
              backgroundColor: "#6EB2CC",
              color: "white",
              borderRadius: "8px",
              fontWeight: "500",
              border: "none",
            }}
          >
            + Add Plan
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div
        className="card shadow-sm border-0 p-0 position-relative"
        style={{ borderRadius: "16px" }}
      >
        {/* TABLE HEADER */}
        <div
          className="w-100 px-3 py-3"
          style={{
            backgroundColor: "#f7f9fb",
            borderBottom: "1px solid #e6e6e6",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          View All Plans
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="table-responsive d-none d-lg-block">
          <table className="table mb-0">
            <thead>
              <tr className="text-uppercase small text-muted">
                <th>Plan Name</th>
                <th>Base Price</th>
                <th>Billing Cycle</th>
                <th>Status</th>
                <th>Descriptions</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td
                    className="text-center py-4 text-muted"
                    colSpan="6"
                    style={{ fontSize: "15px" }}
                  >
                    No plans available.
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.planName}</td>
                    <td>{plan.basePrice}</td>
                    <td>{plan.billingCycle}</td>
                    <td>
                      <span className={`badge ${plan.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>{plan.descriptions.length}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => openViewModal(plan)}
                        >
                          <FaEye size={13} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openEditModal(plan)}
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openDeleteModal(plan)}
                        >
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

        {/* TABLET TABLE VIEW */}
        <div className="table-responsive d-none d-md-block d-lg-none">
          <table className="table mb-0">
            <thead>
              <tr className="text-uppercase small text-muted">
                <th>Plan Name</th>
                <th>Price</th>
                <th>Billing</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td
                    className="text-center py-4 text-muted"
                    colSpan="5"
                    style={{ fontSize: "15px" }}
                  >
                    No plans available.
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.planName}</td>
                    <td>{plan.basePrice}</td>
                    <td>{plan.billingCycle}</td>
                    <td>
                      <span className={`badge ${plan.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => openViewModal(plan)}
                        >
                          <FaEye size={12} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => openEditModal(plan)}
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => openDeleteModal(plan)}
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="d-md-none p-3">
          {plans.length === 0 ? (
            <div
              className="text-center py-4 text-muted"
              style={{ fontSize: "15px" }}
            >
              No plans available.
            </div>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="card mb-3 shadow-sm" style={{ borderRadius: "12px" }}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0 fw-bold">{plan.planName}</h5>
                    <span className={`badge ${plan.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                      {plan.status}
                    </span>
                  </div>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <small className="text-muted d-block">Price</small>
                      <span>{plan.basePrice}</span>
                    </div>
                    <div className="col-6">
                      <small className="text-muted d-block">Billing</small>
                      <span>{plan.billingCycle}</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted d-block">Descriptions</small>
                    <span>{plan.descriptions.length} items</span>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openViewModal(plan)}
                    >
                      <FaEye size={13} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openEditModal(plan)}
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => openDeleteModal(plan)}
                    >
                      <FaTrashAlt size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------------- FULLY RESPONSIVE MODAL ---------------- */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "14px" }}>
              {/* HEADER */}
              <div className="modal-header border-0 py-2 px-3">
                <h5 className="fw-bold fs-6 mb-0">
                  {modalType === "add"
                    ? "Add New Plan"
                    : modalType === "edit"
                    ? "Edit Plan"
                    : "Plan Details"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-3">
                <div
                  style={{
                    background: "#6EB2CC",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    fontSize: "0.9rem"
                  }}
                >
                  {modalType === "add" ? "Add New Plan (INR)" : "Edit Plan"}
                </div>

                {/* Simple Form (No Tabs) */}
                <div className="row g-2 g-md-3">
                  <div className="col-12">
                    <label className="form-label fs-6 mb-1">Plan Name</label>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Enter plan name"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      disabled={modalType === "view"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fs-6 mb-1">
                      Base Price (₹)
                    </label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      placeholder="0"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                      disabled={modalType === "view"}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fs-6 mb-1">Billing Cycle</label>
                    <select
                      className="form-select form-select-sm"
                      value={billingCycle}
                      onChange={(e) => setBillingCycle(e.target.value)}
                      disabled={modalType === "view"}
                    >
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fs-6 mb-1">Status</label>
                    <select
                      className="form-select form-select-sm"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={modalType === "view"}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fs-6 mb-1">Descriptions</label>
                    <div className="d-flex gap-2 flex-column">
                      {descriptions.map((desc, i) => (
                        <input
                          key={i}
                          className="form-control form-control-sm mb-1"
                          placeholder={`Description ${i + 1}`}
                          value={desc}
                          onChange={(e) => updateDescription(i, e.target.value)}
                          disabled={modalType === "view"}
                        />
                      ))}

                      {modalType !== "view" && (
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#6EB2CC",
                            color: "white",
                            borderRadius: "4px",
                            border: "none",
                            width: "32px",
                            height: "32px",
                            fontWeight: "600",
                            padding: "0"
                          }}
                          onClick={addDescription}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 py-2 px-3">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>

                {modalType !== "view" && (
                  <button
                    type="button"
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#6EB2CC",
                      color: "white",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                    onClick={handleSavePlan}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div 
            className="modal-dialog modal-dialog-centered" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-body text-center p-4">
                <h5>Delete This Plan?</h5>
                <p className="text-muted">This action cannot be undone.</p>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn btn-danger" 
                    onClick={deletePlan}
                  >
                    Delete
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