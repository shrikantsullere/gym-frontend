import React, { useState } from "react";

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Inter, sans-serif",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  header: { marginBottom: "25px" },
  title: { fontSize: "28px", fontWeight: "600", margin: 0 },
  subtitle: { margin: 0, color: "#666" },

  section: {
    marginBottom: "25px",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
  },

  formRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  formCol: {
    flex: "1 1 300px",
    minWidth: "250px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },

  saveBtn: {
    marginTop: "25px",
    padding: "14px 22px",
    background: "#6EB2CC",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "250px",
  },

  responsive: `
    @media(max-width:768px){
      .formRow {
        flex-direction: column !important;
      }
    }
  `,
};

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    adminName: "",
    email: "",
    phone: "",
    branchName: "",
    timings: "",
    gstNumber: "",
    gstPercent: "",
    stripeKey: "",
    razorKey: "",
    razorSecret: "",
  });

  const handleChange = (field, value) => setSettings({ ...settings, [field]: value });
  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("✅ All Settings Saved!");
  };

  return (
    <div style={styles.page}>
      <style>{styles.responsive}</style>

      <div style={styles.header}>
        <h2 style={styles.title}>Settings</h2>
        <p style={styles.subtitle}>Update all gym configurations.</p>
      </div>

      {/* Account Info */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Account Information</div>
        <div style={styles.formRow} className="formRow">
          <div style={styles.formCol}>
            <label style={styles.label}>Admin Name</label>
            <input
              style={styles.input}
              value={settings.adminName}
              onChange={(e) => handleChange("adminName", e.target.value)}
              placeholder="Enter admin name"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>Phone</label>
            <input
              style={styles.input}
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </div>

      {/* Branch Branding */}
      {/* <div style={styles.section}>
        <div style={styles.sectionTitle}>Branch Branding</div>
        <div style={styles.formRow} className="formRow">
          <div style={styles.formCol}>
            <label style={styles.label}>Branch Name</label>
            <input
              style={styles.input}
              value={settings.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              placeholder="Enter branch name"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>Gym Timings</label>
            <input
              style={styles.input}
              value={settings.timings}
              onChange={(e) => handleChange("timings", e.target.value)}
              placeholder="6AM - 10PM"
            />
          </div>
        </div>
      </div> */}

      {/* GST */}
      {/* <div style={styles.section}>
        <div style={styles.sectionTitle}>Taxes (GST)</div>
        <div style={styles.formRow} className="formRow">
          <div style={styles.formCol}>
            <label style={styles.label}>GST Number</label>
            <input
              style={styles.input}
              value={settings.gstNumber}
              onChange={(e) => handleChange("gstNumber", e.target.value)}
              placeholder="Enter GST Number"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>GST %</label>
            <input
              style={styles.input}
              type="number"
              value={settings.gstPercent}
              onChange={(e) => handleChange("gstPercent", e.target.value)}
              placeholder="18"
            />
          </div>
        </div>
      </div> */}

      {/* Payment Keys */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Payment Gateway Keys</div>
        <div style={styles.formRow} className="formRow">
          <div style={styles.formCol}>
            <label style={styles.label}>Stripe API Key</label>
            <input
              style={styles.input}
              value={settings.stripeKey}
              onChange={(e) => handleChange("stripeKey", e.target.value)}
              placeholder="Enter Stripe key"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>Razorpay Key ID</label>
            <input
              style={styles.input}
              value={settings.razorKey}
              onChange={(e) => handleChange("razorKey", e.target.value)}
              placeholder="Enter Razorpay Key ID"
            />
          </div>

          <div style={styles.formCol}>
            <label style={styles.label}>Razorpay Secret</label>
            <input
              style={styles.input}
              value={settings.razorSecret}
              onChange={(e) => handleChange("razorSecret", e.target.value)}
              placeholder="Enter Razorpay Secret"
            />
          </div>
        </div>
      </div>

      <button style={styles.saveBtn} onClick={handleSave}>
        Save All Settings
      </button>
    </div>
  );
};

export default AdminSettings;
