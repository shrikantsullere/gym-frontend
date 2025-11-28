import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

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

  const updateStatus = (index, newStatus) => {
    const updated = [...rows];
    updated[index].status = newStatus;
    setRows(updated);
  };

  const styles = {
    container: {
      padding: "30px",
      background: "#f7f8fa",
      fontFamily: "Inter, sans-serif",
    },

    titleBox: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px",
    },

    titleCircle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#1e1e1e",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "18px",
      fontWeight: 600,
    },

    title: {
      fontSize: "24px",
      fontWeight: 600,
    },

    tableBox: {
      background: "white",
      padding: "20px",
      borderRadius: "18px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    },

    headerRow: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr 1fr 1fr 1fr",
      padding: "16px 10px",
      fontWeight: 600,
      borderBottom: "2px solid #eee",
      color: "#333",
      fontSize: "15px",
    },

    row: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr 1fr 1fr 1fr",
      padding: "16px 10px",
      fontSize: "14px",
      alignItems: "center",
      borderBottom: "1px solid #f1f1f1",
      transition: "0.25s",
      cursor: "pointer",
    },

    rowHover: {
      background: "#f5faff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transform: "scale(1.002)",
    },

    pill: {
      padding: "7px 14px",
      borderRadius: "20px",
      fontWeight: 600,
      fontSize: "13px",
    },

    gold: { background: "#ffd200", color: "#111" },
    basic: { background: "#b6e6ef", color: "#083d44" },

    statusBase: {
      padding: "7px 14px",
      borderRadius: "20px",
      fontWeight: 600,
      fontSize: "13px",
      textAlign: "center",
    },

    pending: { background: "#ffe9b3", color: "#8a5d00" },
    approved: { background: "#2ecc71", color: "white" },
    rejected: { background: "#ff6e6e", color: "white" },

    actions: {
      display: "flex",
      gap: "10px",
    },

    button: {
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      cursor: "pointer",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "0.25s",
      fontWeight: 600,
    },

    approveBtn: {
      background: "#28c76f",
      color: "white",
    },

    rejectBtn: {
      background: "#ff4d4d",
      color: "white",
    },

    btnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    },
  };

  // TRACK WHICH ROW IS HOVERED
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div style={styles.container}>
      {/* HEADER WITH BLACK CIRCLE */}
      <div style={styles.titleBox}>
        <div style={styles.titleCircle}>📘</div>
        <h2 style={styles.title}>Requested Plans</h2>
      </div>

      <div style={styles.tableBox}>
        <div style={styles.headerRow}>
          <span>Admin</span>
          <span>Email</span>
          <span>Plan</span>
          <span>Billing</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {rows.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.row,
              ...(hoverIndex === index ? styles.rowHover : {}),
            }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span>{item.admin}</span>
            <span>{item.email}</span>

            <span>
              <span
                style={{
                  ...styles.pill,
                  ...(item.plan === "Gold" ? styles.gold : styles.basic),
                }}
              >
                {item.plan}
              </span>
            </span>

            <span>{item.billing}</span>
            <span>{item.date}</span>

            <span>
              <span
                style={{
                  ...styles.statusBase,
                  ...(item.status === "Pending"
                    ? styles.pending
                    : item.status === "Approved"
                    ? styles.approved
                    : styles.rejected),
                }}
              >
                {item.status}
              </span>
            </span>

            <span style={styles.actions}>
              <button
                style={{
                  ...styles.button,
                  ...styles.approveBtn,
                  ...(hoverIndex === index ? styles.btnHover : {}),
                }}
                onClick={() => updateStatus(index, "Approved")}
              >
                <FaCheck /> Approve
              </button>

              <button
                style={{
                  ...styles.button,
                  ...styles.rejectBtn,
                  ...(hoverIndex === index ? styles.btnHover : {}),
                }}
                onClick={() => updateStatus(index, "Rejected")}
              >
                <FaTimes /> Reject
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestedPlans;
