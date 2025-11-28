import React, { useState } from "react";

// ===== INLINE CSS (Professional Gym SaaS Style) =====
const styles = {
  page: {
    padding: "25px",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    marginBottom: "25px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
  },
  subtitle: {
    margin: 0,
    color: "#666",
  },
  navTabs: {
    display: "flex",
    gap: "18px",
    marginBottom: "25px",
    borderBottom: "1px solid #e5e5e5",
    paddingBottom: "10px",
  },
  tabBtn: (active) => ({
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    background: active ? "#6EB2CC" : "#f5f5f5",
    color: active ? "#fff" : "#333",
  }),
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
  },
  inputGroup: { display: "flex", flexDirection: "column", marginBottom: "18px" },
  label: { marginBottom: "6px", fontSize: "14px", fontWeight: "500" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    fontSize: "14px",
    outline: "none",
  },
  saveBtn: {
    marginTop: "20px",
    padding: "12px 22px",
    background: "#6EB2CC", // UPDATED BUTTON COLOR
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
  },
};

// ==================== MAIN COMPONENT ====================
const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div style={styles.page}>
      {/* PAGE TITLE */}
      <div style={styles.header}>
        <h2 style={styles.title}>Settings</h2>
        <p style={styles.subtitle}>Manage your gym system configurations.</p>
      </div>

      {/* TABS */}
      <div style={styles.navTabs}>
        <div style={styles.tabBtn(activeTab === "account")} onClick={() => setActiveTab("account")}>
          Account Info
        </div>
        <div style={styles.tabBtn(activeTab === "branding")} onClick={() => setActiveTab("branding")}>
          Branch Branding
        </div>
        <div style={styles.tabBtn(activeTab === "gst")} onClick={() => setActiveTab("gst")}>
          Taxes (GST)
        </div>
        <div style={styles.tabBtn(activeTab === "payment")} onClick={() => setActiveTab("payment")}>
          Payment Gateway Keys
        </div>
      </div>

      {/* ===================== ACCOUNT INFO ===================== */}
      {activeTab === "account" && (
        <div style={styles.card}>
          <h3>Account Information</h3>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Admin Name</label>
            <input style={styles.input} placeholder="Enter admin name" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} placeholder="Enter email" type="email" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone</label>
            <input style={styles.input} placeholder="Enter phone number" />
          </div>

          <button style={styles.saveBtn}>Save Changes</button>
        </div>
      )}

      {/* ===================== BRANCH BRANDING ===================== */}
      {activeTab === "branding" && (
        <div style={styles.card}>
          <h3>Branch Branding</h3>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Gym Logo</label>
            <input style={styles.input} type="file" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Branch Name</label>
            <input style={styles.input} placeholder="Enter branch name" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Gym Timings</label>
            <input style={styles.input} placeholder="6AM - 10PM" />
          </div>

          <button style={styles.saveBtn}>Save Branding</button>
        </div>
      )}

      {/* ===================== GST SETTINGS ===================== */}
      {activeTab === "gst" && (
        <div style={styles.card}>
          <h3>Taxes (GST)</h3>

          <div style={styles.inputGroup}>
            <label style={styles.label}>GST Number</label>
            <input style={styles.input} placeholder="Enter GST Number" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>GST %</label>
            <input
              style={styles.input}
              type="number"
              placeholder="Enter GST percentage (ex: 18)"
            />
          </div>

          <button style={styles.saveBtn}>Save GST Settings</button>
        </div>
      )}

      {/* ===================== PAYMENT GATEWAY KEYS ===================== */}
      {activeTab === "payment" && (
        <div style={styles.card}>
          <h3>Payment Gateway Keys</h3>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Stripe API Key</label>
            <input style={styles.input} placeholder="Enter Stripe key" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Razorpay Key ID</label>
            <input style={styles.input} placeholder="Enter Razorpay Key ID" />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Razorpay Secret</label>
            <input style={styles.input} placeholder="Enter Razorpay Secret" />
          </div>

          <button style={styles.saveBtn}>Save Payment Keys</button>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
