import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFileExport,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFilePdf,
  FaTrash,
} from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const tabs = ["All Payments", "Failed Transactions", "Payment Settings"];

const transactions = [
  { id: "TXN-23456", date: "Jun 27, 2025", customer: "John Smith", method: { name: "Credit Card" }, amount: "$1,299.99", status: "Success", reason: "" },
  { id: "TXN-23455", date: "Jun 27, 2025", customer: "Emily Johnson", method: { name: "PayPal" }, amount: "$499.50", status: "Success", reason: "" },
  { id: "TXN-23454", date: "Jun 26, 2025", customer: "Michael Brown", method: { name: "Credit Card" }, amount: "$899.00", status: "Failed", reason: "Insufficient funds" },
  { id: "TXN-23453", date: "Jun 26, 2025", customer: "Sarah Williams", method: { name: "Bank Transfer" }, amount: "$149.99", status: "Success", reason: "" },
  { id: "TXN-23452", date: "Jun 25, 2025", customer: "David Miller", method: { name: "Credit Card" }, amount: "$2,499.00", status: "Pending", reason: "" },
  { id: "TXN-23451", date: "Jun 25, 2025", customer: "Jessica Davis", method: { name: "Digital Wallet" }, amount: "$349.95", status: "Success", reason: "" },
  { id: "TXN-23450", date: "Jun 24, 2025", customer: "Robert Wilson", method: { name: "Credit Card" }, amount: "$799.50", status: "Failed", reason: "Expired card" },
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState("All Payments");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionsList, setTransactionsList] = useState(transactions);
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    autoRefund: true,
    notifications: true,
    paymentMethods: ["Credit Card", "PayPal", "Bank Transfer", "Digital Wallet"]
  });

  const handleViewDetails = (txn) => {
    setSelectedTransaction(txn);
    setShowModal(true);
  };

  const handleDeleteClick = (txn) => {
    setTransactionToDelete(txn);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setTransactionsList(transactionsList.filter(txn => txn.id !== transactionToDelete.id));
    setShowDeleteModal(false);
    setTransactionToDelete(null);
  };

  const handleExportTransaction = (txn) => {
    alert(`Transaction ${txn.id} export requires html2canvas.`);
  };

  const handleExportAll = () => {
    const headers = ["ID", "Date", "Customer", "Method", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...transactionsList.map(txn =>
        [txn.id, txn.date, txn.customer, txn.method.name, txn.amount, txn.status].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePDFDownload = () => {
    alert("PDF requires html2canvas + jspdf.");
  };

  const handleSettingChange = (setting, value) => {
    setPaymentSettings({ ...paymentSettings, [setting]: value });
  };

  const filteredTransactions = transactionsList.filter(txn => {
    const matchesTab = activeTab === "Failed Transactions" ? txn.status === "Failed" : true;
    const matchesSearch = searchTerm === "" ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.customer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="container-fluid py-4">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold">Payments</h4>
          <p className="text-muted mb-0">Manage all your payment transactions</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-custom d-flex align-items-center gap-2 px-3 py-2" onClick={handleExportAll}>
            <FaFileExport /> Export CSV
          </button>
          <button className="btn btn-custom px-3 py-2" onClick={handlePDFDownload}>
            <FaFilePdf size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="icon-card bg-info text-white"><FaChartLine /></div>
                <h6 className="text-muted mb-0">Total Revenue</h6>
              </div>
              <h5 className="fw-bold">$12,345.67</h5>
              <p className="text-success small mb-0">↑ 12.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="icon-card bg-success text-white"><FaCheckCircle /></div>
                <h6 className="text-muted mb-0">Success Rate</h6>
              </div>
              <h5 className="fw-bold">94.2%</h5>
              <p className="text-success small mb-0">↑ 2.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="icon-card bg-danger text-white"><FaExclamationTriangle /></div>
                <h6 className="text-muted mb-0">Failed Transactions</h6>
              </div>
              <h5 className="fw-bold text-danger">24</h5>
              <p className="text-danger small mb-0">↓ 5.3% from last month</p>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3">
        {tabs.map(tab => (
          <li className="nav-item" key={tab}>
            <button className={`nav-link ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {(activeTab === "All Payments" || activeTab === "Failed Transactions") && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search by transaction ID or customer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {(activeTab === "All Payments" || activeTab === "Failed Transactions") && (
        <div className="table-responsive bg-white rounded shadow-sm p-3" id="transaction-table">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th><input type="checkbox" /></th>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((txn, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" /></td>
                  <td>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td><strong>{txn.customer}</strong></td>
                  <td>{txn.method.name}</td>
                  <td>{txn.amount}</td>

                  <td>
                    {txn.status === "Success" && <span className="badge bg-success">Success</span>}
                    {txn.status === "Failed" && (
                      <>
                        <span className="badge bg-danger">Failed</span><br />
                        <small className="text-danger">{txn.reason}</small>
                      </>
                    )}
                    {txn.status === "Pending" && <span className="badge bg-warning text-dark">Pending</span>}
                  </td>

                  {/* FINAL ACTION BUTTONS (Screenshot Style) */}
                  <td className="d-flex gap-2">
                    <button className="action-btn eye-btn" onClick={() => handleViewDetails(txn)}>
                      <BsEye size={16} />
                    </button>

                    <button className="action-btn edit-btn" onClick={() => alert("Edit feature coming soon")}>
                      ✏️
                    </button>

                    <button className="action-btn delete-btn" onClick={() => handleDeleteClick(txn)}>
                      <FaTrash size={14} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Payment Settings" && (
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="mb-4">Payment Settings</h5>
        </div>
      )}

      {showModal && selectedTransaction && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Details</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <ul className="list-unstyled">
                  <li><strong>ID:</strong> {selectedTransaction.id}</li>
                  <li><strong>Customer:</strong> {selectedTransaction.customer}</li>
                  <li><strong>Amount:</strong> {selectedTransaction.amount}</li>
                  <li><strong>Status:</strong> {selectedTransaction.status}</li>
                  <li><strong>Date:</strong> {selectedTransaction.date}</li>
                  <li><strong>Method:</strong> {selectedTransaction.method.name}</li>
                </ul>
              </div>

              <div className="modal-footer">
                <button className="btn btn-custom" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && transactionToDelete && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this transaction?</p>
                <div className="alert alert-danger">
                  <strong>ID:</strong> {transactionToDelete.id}<br />
                  <strong>Customer:</strong> {transactionToDelete.customer}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .search-bar { border-radius:10px; padding:0.6rem 1rem; }
        .btn-custom { background-color:#6EB2CC; color:white; border:none; }
        .icon-card { width:40px; height:40px; border-radius:8px; display:flex; align-items:center; justify-content:center; }

        /* Screenshot Matching Action Buttons */
        .action-btn {
          width: 38px;
          height: 38px;
          border-radius: 6px;
          border: 2px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .eye-btn {
          background: white;
          border-color: #c9c9c9;
          color: #333;
        }
        .edit-btn {
          background: #e6f7ff;
          border-color: #86c9ef;
          color: #0077b6;
          font-size: 15px;
        }
        .delete-btn {
          background: #ffe5e5;
          border-color: #ff4d4d;
          color: #d90429;
        }
      `}</style>

    </div>
  );
};

export default Payments;
