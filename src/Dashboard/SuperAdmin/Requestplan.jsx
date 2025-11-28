import React, { useState } from "react";
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const RequestedPlans = () => {
  const [rows, setRows] = useState([
    {
      admin: "kiaaa teach",
      email: "pankit1205@gmail.com",
      plan: "Gold",
      billing: "Yearly",
      date: "2025-11-29",
      status: "Pending",
    },
    {
      admin: "Kiaan",
      email: "Kiaan@gmail.com",
      plan: "Gold",
      billing: "Yearly",
      date: "2025-11-20",
      status: "Pending",
    },
    {
      admin: "ram",
      email: "ram@gmail.com",
      plan: "Basic",
      billing: "Yearly",
      date: "2025-11-11",
      status: "Pending",
    },
    {
      admin: "ABC Technologies Pvt Ltd",
      email: "contact@abctech.com",
      plan: "Basic",
      billing: "Monthly",
      date: "2025-11-21",
      status: "Pending",
    },
  ]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  const updateStatus = (index, newStatus) => {
    const updated = [...rows];
    updated[index].status = newStatus;
    setRows(updated);
  };

  const toggleRowExpansion = (index) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return { bg: "#ffe9b3", color: "#8a5d00" };
      case "Approved": return { bg: "#2ecc71", color: "white" };
      case "Rejected": return { bg: "#ff6e6e", color: "white" };
      default: return { bg: "#f0f0f0", color: "#333" };
    }
  };

  const getPlanColor = (plan) => {
    return plan === "Gold" 
      ? { bg: "#ffd200", color: "#111" }
      : { bg: "#b6e6ef", color: "#083d44" };
  };

  return (
    <div className="min-vh-100 bg-light" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* HEADER */}
      <div className="container-fluid p-3 p-md-4">
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-8">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle bg-dark d-flex align-items-center justify-content-center text-white" 
                   style={{ width: "40px", height: "40px", fontSize: "18px", fontWeight: "600" }}>
                📘
              </div>
              <h2 className="mb-0 fw-bold fs-4 fs-md-3">Requested Plans</h2>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="d-none d-lg-block">
          <div className="card border-0 shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 px-3 border-0">Admin</th>
                    <th className="py-3 px-3 border-0">Email</th>
                    <th className="py-3 px-3 border-0">Plan</th>
                    <th className="py-3 px-3 border-0">Billing</th>
                    <th className="py-3 px-3 border-0">Date</th>
                    <th className="py-3 px-3 border-0">Status</th>
                    <th className="py-3 px-3 border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, index) => (
                    <tr 
                      key={index} 
                      className="border-bottom"
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                      style={{ 
                        backgroundColor: hoverIndex === index ? "#f5faff" : "transparent",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <td className="py-3 px-3">
                        <div className="fw-semibold">{item.admin}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-muted small">{item.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span 
                          className="badge rounded-pill px-3 py-2"
                          style={{ 
                            backgroundColor: getPlanColor(item.plan).bg,
                            color: getPlanColor(item.plan).color,
                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >
                          {item.plan}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-muted">{item.billing}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-muted small">{item.date}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span 
                          className="badge rounded-pill px-3 py-2"
                          style={{ 
                            backgroundColor: getStatusColor(item.status).bg,
                            color: getStatusColor(item.status).color,
                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm btn-success rounded-pill px-3 d-flex align-items-center gap-1"
                            style={{ 
                              fontSize: "12px",
                              transition: "all 0.3s ease",
                              transform: hoverIndex === index ? "translateY(-2px)" : "translateY(0)"
                            }}
                            onClick={() => updateStatus(index, "Approved")}
                          >
                            <FaCheck size={12} /> Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger rounded-pill px-3 d-flex align-items-center gap-1"
                            style={{ 
                              fontSize: "12px",
                              transition: "all 0.3s ease",
                              transform: hoverIndex === index ? "translateY(-2px)" : "translateY(0)"
                            }}
                            onClick={() => updateStatus(index, "Rejected")}
                          >
                            <FaTimes size={12} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TABLET VIEW */}
        <div className="d-none d-md-block d-lg-none">
          <div className="card border-0 shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 px-2 border-0">Admin</th>
                    <th className="py-3 px-2 border-0">Plan</th>
                    <th className="py-3 px-2 border-0">Status</th>
                    <th className="py-3 px-2 border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item, index) => (
                    <tr 
                      key={index} 
                      className="border-bottom"
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                      style={{ 
                        backgroundColor: hoverIndex === index ? "#f5faff" : "transparent",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <td className="py-3 px-2">
                        <div className="fw-semibold">{item.admin}</div>
                        <div className="text-muted small">{item.email}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span 
                          className="badge rounded-pill px-2 py-1"
                          style={{ 
                            backgroundColor: getPlanColor(item.plan).bg,
                            color: getPlanColor(item.plan).color,
                            fontSize: "12px",
                            fontWeight: "600"
                          }}
                        >
                          {item.plan}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span 
                          className="badge rounded-pill px-2 py-1"
                          style={{ 
                            backgroundColor: getStatusColor(item.status).bg,
                            color: getStatusColor(item.status).color,
                            fontSize: "12px",
                            fontWeight: "600"
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="d-flex gap-1 justify-content-center flex-wrap">
                          <button
                            className="btn btn-sm btn-success rounded-pill px-2 py-1"
                            style={{ fontSize: "11px" }}
                            onClick={() => updateStatus(index, "Approved")}
                          >
                            <FaCheck size={10} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger rounded-pill px-2 py-1"
                            style={{ fontSize: "11px" }}
                            onClick={() => updateStatus(index, "Rejected")}
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="d-lg-none">
          {rows.map((item, index) => (
            <div key={index} className="card border-0 shadow-sm mb-3">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="mb-1 fw-bold">{item.admin}</h6>
                    <p className="text-muted small mb-0">{item.email}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-light rounded-circle p-2"
                    onClick={() => toggleRowExpansion(index)}
                    style={{ border: "none" }}
                  >
                    {expandedRows.includes(index) ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Plan</small>
                    <span 
                      className="badge rounded-pill px-2 py-1 mt-1 d-inline-block"
                      style={{ 
                        backgroundColor: getPlanColor(item.plan).bg,
                        color: getPlanColor(item.plan).color,
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                    >
                      {item.plan}
                    </span>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Status</small>
                    <span 
                      className="badge rounded-pill px-2 py-1 mt-1 d-inline-block"
                      style={{ 
                        backgroundColor: getStatusColor(item.status).bg,
                        color: getStatusColor(item.status).color,
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {expandedRows.includes(index) && (
                  <div className="border-top pt-3">
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <small className="text-muted d-block">Billing</small>
                        <span className="fw-semibold">{item.billing}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block">Date</small>
                        <span className="fw-semibold">{item.date}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-success rounded-pill flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                    style={{ fontSize: "13px" }}
                    onClick={() => updateStatus(index, "Approved")}
                  >
                    <FaCheck size={12} /> Approve
                  </button>
                  <button
                    className="btn btn-danger rounded-pill flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                    style={{ fontSize: "13px" }}
                    onClick={() => updateStatus(index, "Rejected")}
                  >
                    <FaTimes size={12} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestedPlans;