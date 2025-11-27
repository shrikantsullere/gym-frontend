// import React, { useState, useEffect } from "react";
// import {
//   FaEye,
//   FaEdit,
//   FaTrashAlt,
// } from "react-icons/fa";

// const Setting = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("add");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const [plans, setPlans] = useState([]);

//   const [descriptions, setDescriptions] = useState(["Description 1"]);
//   const [planName, setPlanName] = useState("");
//   const [basePrice, setBasePrice] = useState("");
//   const [billingCycle, setBillingCycle] = useState("Monthly");
//   const [status, setStatus] = useState("Active");

//   useEffect(() => {
//     if (isModalOpen || isDeleteModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//   }, [isModalOpen, isDeleteModalOpen]);

//   // ---------------- MODALS ----------------

//   const openAddModal = () => {
//     setModalType("add");
//     setSelectedPlan(null);
//     setPlanName("");
//     setBasePrice("");
//     setBillingCycle("Monthly");
//     setStatus("Active");
//     setDescriptions(["Description 1"]);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (plan) => {
//     setModalType("edit");
//     setSelectedPlan(plan);
//     setPlanName(plan.planName);
//     setBasePrice(plan.basePrice);
//     setBillingCycle(plan.billingCycle);
//     setStatus(plan.status);
//     setDescriptions(plan.descriptions || ["Description 1"]);
//     setIsModalOpen(true);
//   };

//   const openViewModal = (plan) => {
//     setModalType("view");
//     setSelectedPlan(plan);
//     setIsModalOpen(true);
//   };

//   const openDeleteModal = (plan) => {
//     setSelectedPlan(plan);
//     setIsDeleteModalOpen(true);
//   };

//   const deletePlan = () => {
//     setPlans((prev) => prev.filter((p) => p.id !== selectedPlan.id));
//     setIsDeleteModalOpen(false);
//   };

//   // ---------------- DESCRIPTIONS ----------------
//   const addDescription = () => {
//     setDescriptions([...descriptions, ""]);
//   };

//   const updateDescription = (index, value) => {
//     const newDescriptions = [...descriptions];
//     newDescriptions[index] = value;
//     setDescriptions(newDescriptions);
//   };

//   // ---------------- SAVE PLAN ----------------
//   const handleSavePlan = () => {
//     const planData = {
//       id: selectedPlan ? selectedPlan.id : Date.now(),
//       planName,
//       basePrice,
//       billingCycle,
//       status,
//       descriptions,
//     };

//     if (modalType === "edit") {
//       setPlans((prev) =>
//         prev.map((p) => (p.id === selectedPlan.id ? planData : p))
//       );
//     } else {
//       setPlans((prev) => [...prev, planData]);
//     }

//     setIsModalOpen(false);
//   };

//   return (
//     <div
//       className="container-fluid p-4"
//       style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}
//     >
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold d-flex align-items-center gap-2">
//             <span style={{ fontSize: "28px" }}>💰</span> Plans & Pricing
//           </h2>
//           <p className="text-muted mb-0">
//             Manage your subscription plans, pricing options.
//           </p>
//         </div>

//         {/* ADD PLAN BUTTON */}
//         <button
//           onClick={openAddModal}
//           className="btn px-4 py-2"
//           style={{
//             backgroundColor: "#6EB2CC",
//             color: "white",
//             borderRadius: "8px",
//             fontWeight: "500",
//             border: "none",
//           }}
//         >
//           + Add Plan
//         </button>
//       </div>

//       {/* MAIN CARD */}
//       <div
//         className="card shadow-sm border-0 p-0 position-relative"
//         style={{ borderRadius: "16px" }}
//       >
//         {/* TABLE HEADER */}
//         <div
//           className="w-100 px-3 py-3"
//           style={{
//             backgroundColor: "#f7f9fb",
//             borderBottom: "1px solid #e6e6e6",
//             borderTopLeftRadius: "16px",
//             borderTopRightRadius: "16px",
//             fontSize: "15px",
//             fontWeight: "600",
//           }}
//         >
//           View All Plans
//         </div>

//         {/* TABLE */}
//         <div className="table-responsive" style={{ whiteSpace: "nowrap" }}>
//           <table className="table mb-0">
//             <thead>
//               <tr className="text-uppercase small text-muted">
//                 <th>Plan Name</th>
//                 <th>Base Price</th>
//                 <th>Billing Cycle</th>
//                 <th>Status</th>
//                 <th>Descriptions</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {plans.length === 0 ? (
//                 <tr>
//                   <td
//                     className="text-center py-4 text-muted"
//                     colSpan="6"
//                     style={{ fontSize: "15px" }}
//                   >
//                     No plans available.
//                   </td>
//                 </tr>
//               ) : (
//                 plans.map((plan) => (
//                   <tr key={plan.id}>
//                     <td>{plan.planName}</td>
//                     <td>{plan.basePrice}</td>
//                     <td>{plan.billingCycle}</td>
//                     <td>{plan.status}</td>
//                     <td>{plan.descriptions.length}</td>
//                     <td>
//                       <div className="d-flex gap-2">
//                         <button
//                           className="btn btn-sm btn-outline-secondary"
//                           onClick={() => openViewModal(plan)}
//                         >
//                           <FaEye size={13} />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-primary"
//                           onClick={() => openEditModal(plan)}
//                         >
//                           <FaEdit size={13} />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => openDeleteModal(plan)}
//                         >
//                           <FaTrashAlt size={13} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ---------------- MODAL ---------------- */}
//       {isModalOpen && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", background: "rgba(0,0,0,0.45)" }}
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content" style={{ borderRadius: "14px" }}>
//               {/* HEADER */}
//               <div className="modal-header border-0">
//                 <h5 className="fw-bold">
//                   {modalType === "add"
//                     ? "Add New Plan"
//                     : modalType === "edit"
//                     ? "Edit Plan"
//                     : "Plan Details"}
//                 </h5>
//                 <button
//                   className="btn-close"
//                   onClick={() => setIsModalOpen(false)}
//                 ></button>
//               </div>

//               {/* BODY */}
//               <div className="modal-body">
//                 <div
//                   style={{
//                     background: "#6EB2CC",
//                     color: "white",
//                     padding: "10px 15px",
//                     borderRadius: "8px",
//                     fontWeight: "600",
//                     marginBottom: "18px",
//                   }}
//                 >
//                   {modalType === "add" ? "Add New Plan (INR)" : "Edit Plan"}
//                 </div>

//                 <div className="row g-3">
//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">Plan Name</label>
//                     <input
//                       className="form-control"
//                       placeholder="Enter plan name"
//                       value={planName}
//                       onChange={(e) => setPlanName(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">
//                       Base Price (₹)
//                     </label>
//                     <input
//                       className="form-control"
//                       type="number"
//                       placeholder="0"
//                       value={basePrice}
//                       onChange={(e) => setBasePrice(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">Billing Cycle</label>
//                     <select
//                       className="form-select"
//                       value={billingCycle}
//                       onChange={(e) => setBillingCycle(e.target.value)}
//                     >
//                       <option>Monthly</option>
//                       <option>Yearly</option>
//                     </select>
//                   </div>

//                   <div className="col-md-4">
//                     <label className="form-label fw-semibold">Status</label>
//                     <select
//                       className="form-select"
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                     >
//                       <option>Active</option>
//                       <option>Inactive</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* DESCRIPTIONS */}
//                 <div className="mt-4">
//                   <label className="fw-semibold">Descriptions</label>
//                   <div className="d-flex gap-2 flex-column">
//                     {descriptions.map((desc, i) => (
//                       <input
//                         key={i}
//                         className="form-control mb-2"
//                         placeholder={`Description ${i + 1}`}
//                         value={desc}
//                         onChange={(e) => updateDescription(i, e.target.value)}
//                       />
//                     ))}

//                     <button
//                       className="btn"
//                       style={{
//                         backgroundColor: "#6EB2CC",
//                         color: "white",
//                         borderRadius: "4px",
//                         border: "none",
//                         width: "40px",
//                         height: "40px",
//                         fontWeight: "600",
//                       }}
//                       onClick={addDescription}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* FOOTER */}
//               <div className="modal-footer border-0">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Close
//                 </button>

//                 {modalType !== "view" && (
//                   <button
//                     className="btn"
//                     style={{
//                       backgroundColor: "#6EB2CC",
//                       color: "white",
//                       borderRadius: "6px",
//                       fontWeight: "500",
//                     }}
//                     onClick={handleSavePlan}
//                   >
//                     Save
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DELETE MODAL */}
//       {isDeleteModalOpen && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", background: "rgba(0,0,0,0.45)" }}
//           onClick={() => setIsDeleteModalOpen(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content" style={{ borderRadius: "12px" }}>
//               <div className="modal-body text-center p-4">
//                 <h5>Delete This Plan?</h5>
//                 <p className="text-muted">This action cannot be undone.</p>
//                 <div className="d-flex justify-content-center gap-3 mt-3">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setIsDeleteModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button className="btn btn-danger" onClick={deletePlan}>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Setting;


import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaCog } from "react-icons/fa";

const SuperAdminSettings = () => {
  return (
    <div className="container-fluid p-4" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* PAGE TITLE */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">
            <FaCog className="me-2 text-warning" /> Settings
          </h3>
          <p className="text-muted">Manage your gym system configurations.</p>
        </div>
      </div>

      {/* SETTINGS BOX */}
      <Card className="shadow-sm border-0 rounded-4 p-3">
        <h6 className="fw-bold mb-3">General Settings</h6>
        <hr />

        {/* FORM */}
        <Form>
          <div className="row">

            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold">Gym Name</Form.Label>
              <Form.Control type="text" placeholder="Enter gym name" />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold">Contact Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold">Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label className="fw-semibold">Timezone</Form.Label>
              <Form.Select>
                <option>Asia/Kolkata</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </Form.Select>
            </div>
          </div>

          <h6 className="fw-bold mt-4">Preferences</h6>
          <hr />

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Check
                type="switch"
                id="switch-notification"
                label="Enable Email Notifications"
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Check
                type="switch"
                id="switch-reminders"
                label="Enable Payment Reminders"
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="text-end mt-3">
            <Button variant="primary" className="px-4 rounded-pill">
              Save Settings
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SuperAdminSettings;
