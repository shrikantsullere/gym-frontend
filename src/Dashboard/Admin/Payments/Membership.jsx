import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';


const Membership = () => {
    const allMembers = [
        {
            id: 1,
            title: 'Gold Membership',
            name: 'Alex Johnson',
            amount: '500',
            paidAmount: '300',
            dueAmount: '200',
            startDate: 'January 1, 2020',
            endDate: 'December 26, 2020',
            paymentStatus: 'Pending'
        },
        {
            id: 2,
            title: 'Silver Membership',
            name: 'Braidy Con',
            amount: '300',
            paidAmount: '300',
            dueAmount: '0',
            startDate: 'February 1, 2020',
            endDate: 'January 31, 2021',
            paymentStatus: 'Completed'
        },
        {
            id: 3,
            title: 'Platinum Membership',
            name: 'John Doe',
            amount: '800',
            paidAmount: '500',
            dueAmount: '300',
            startDate: 'March 1, 2020',
            endDate: 'March 1, 2021',
            paymentStatus: 'Pending'
        },
        {
            id: 4,
            title: 'Basic Membership',
            name: 'Jane Smith',
            amount: '150',
            paidAmount: '150',
            dueAmount: '0',
            startDate: 'April 1, 2020',
            endDate: 'April 1, 2021',
            paymentStatus: 'Completed'
        },
        {
            id: 5,
            title: 'Gold Membership',
            name: 'Chris Lee',
            amount: '500',
            paidAmount: '250',
            dueAmount: '250',
            startDate: 'May 1, 2020',
            endDate: 'May 1, 2021',
            paymentStatus: 'Pending'
        },
        {
            id: 6,
            title: 'Silver Membership',
            name: 'Patricia Brown',
            amount: '300',
            paidAmount: '100',
            dueAmount: '200',
            startDate: 'June 1, 2020',
            endDate: 'June 1, 2021',
            paymentStatus: 'Pending'
        },
        {
            id: 7,
            title: 'Platinum Membership',
            name: 'Robert Wilson',
            amount: '800',
            paidAmount: '800',
            dueAmount: '0',
            startDate: 'July 1, 2020',
            endDate: 'July 1, 2021',
            paymentStatus: 'Completed'
        }
    ];

    const [members, setMembers] = useState(allMembers);
    const [filteredMembers, setFilteredMembers] = useState(allMembers);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewModal, setViewModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // Payment related states
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cashAmount, setCashAmount] = useState('');
    const [updatedPayment, setUpdatedPayment] = useState({
        paidAmount: '',
        dueAmount: '',
        paymentStatus: ''
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

    useEffect(() => {
        setFilteredMembers(
            members.filter(member =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset to first page on search
    }, [searchTerm, members]);

    useEffect(() => {
        if (viewModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [viewModal]);

    useEffect(() => {
        // Reset payment states when modal is opened with a new member
        if (selectedMember) {
            setPaymentMethod('');
            setCashAmount('');
            setUpdatedPayment({
                paidAmount: selectedMember.paidAmount,
                dueAmount: selectedMember.dueAmount,
                paymentStatus: selectedMember.paymentStatus
            });
        }
    }, [selectedMember]);

    const closeViewModal = () => {
        setViewModal(false);
        setSelectedMember(null);
    };

    const openViewModal = (member) => {
        setSelectedMember(member);
        setViewModal(true);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);

        if (method === 'online') {
            // For online payment, mark as completed
            const totalAmount = parseFloat(selectedMember.amount);
            setUpdatedPayment({
                paidAmount: totalAmount.toString(),
                dueAmount: '0',
                paymentStatus: 'Completed'
            });
        } else if (method === 'cash') {
            // Reset to original values for cash selection
            setUpdatedPayment({
                paidAmount: selectedMember.paidAmount,
                dueAmount: selectedMember.dueAmount,
                paymentStatus: selectedMember.paymentStatus
            });
            setCashAmount('');
        }
    };

    const handleCashAmountChange = (e) => {
        const amount = e.target.value;
        setCashAmount(amount);

        if (amount && !isNaN(amount)) {
            const totalAmount = parseFloat(selectedMember.amount);
            const currentPaid = parseFloat(selectedMember.paidAmount);
            const additionalAmount = parseFloat(amount);
            const newPaidAmount = currentPaid + additionalAmount;
            const newDueAmount = Math.max(0, totalAmount - newPaidAmount);

            setUpdatedPayment({
                paidAmount: newPaidAmount.toString(),
                dueAmount: newDueAmount.toString(),
                paymentStatus: newDueAmount === 0 ? 'Completed' : 'Pending'
            });
        }
    };

    const savePaymentChanges = () => {
        if (selectedMember) {
            const updatedMembers = members.map(member => {
                if (member.id === selectedMember.id) {
                    return {
                        ...member,
                        paidAmount: updatedPayment.paidAmount,
                        dueAmount: updatedPayment.dueAmount,
                        paymentStatus: updatedPayment.paymentStatus
                    };
                }
                return member;
            });

            setMembers(updatedMembers);
            closeViewModal();
        }
    };

    // Get current page members
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusBadgeClass = (status) => {
        return status === 'Completed'
            ? 'badge bg-success'
            : 'badge bg-warning text-dark';
    };

    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="row mb-4 align-items-center">
                <div className="col-12 col-lg-8">
                    <h2 className="fw-bold">Payments List</h2>
                    <p className="text-muted mb-0">Manage all member payments and their status.</p>
                </div>
            </div>

            {/* Search */}
            <div className="row mb-4 g-3">
                <div className="col-12 col-md-6 col-lg-5">
                    <div className="input-group">
                        <span className="input-group-text bg-light border">
                            <FaSearch className="text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control border"
                            placeholder="Search payments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="fw-semibold">Title</th>
                                <th className="fw-semibold">Member Name</th>
                                <th className="fw-semibold">Amount</th>
                                <th className="fw-semibold">Paid Amount</th>
                                <th className="fw-semibold">Due Amount</th>
                                <th className="fw-semibold">Membership Start Date</th>
                                <th className="fw-semibold">Membership End Date</th>
                                <th className="fw-semibold">Payment Status</th>
                                <th className="fw-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.map(member => (
                                <tr key={member.id} className={member.paymentStatus === 'Completed' ? 'table-success' : ''}>
                                    <td>{member.title}</td>
                                    <td>{member.name}</td>
                                    <td>₹{member.amount}</td>
                                    <td>₹{member.paidAmount}</td>
                                    <td>₹{member.dueAmount}</td>
                                    <td>{member.startDate}</td>
                                    <td>{member.endDate}</td>
                                    <td>
                                        <span className={getStatusBadgeClass(member.paymentStatus)}>
                                            {member.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                backgroundColor: '#e7f3ff',
                                                color: '#4A90E2',
                                                width: '32px',
                                                height: '32px',
                                                border: '1px solid #d1e9ff',
                                                transition: 'all 0.2s ease'
                                            }}
                                            title="View"
                                            onClick={() => openViewModal(member)}
                                            onMouseOver={(e) => {
                                                e.target.style.backgroundColor = '#4A90E2';
                                                e.target.style.color = '#ffffff';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.backgroundColor = '#e7f3ff';
                                                e.target.style.color = '#4A90E2';
                                            }}
                                        >
                                            <FaEye size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {currentMembers.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center text-muted py-4">
                                        No payments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                    className="btn btn-outline-primary me-2 rounded-pill px-3"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-outline-primary ms-2 rounded-pill px-3"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* VIEW MODAL */}
            {viewModal && selectedMember && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={closeViewModal}
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content shadow-lg">
                            <div className="modal-header text-white border-0"style={{ backgroundColor: "#6EB2CC" }}>
                                <h5 className="modal-title fw-bold">Payment Details</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeViewModal}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Title:</strong> {selectedMember.title}</p>
                                        <p><strong>Member Name:</strong> {selectedMember.name}</p>
                                        <p><strong>Total Amount:</strong> ₹{selectedMember.amount}</p>
                                        <p><strong>Paid Amount:</strong> ₹{updatedPayment.paidAmount}</p>
                                        <p><strong>Due Amount:</strong> ₹{updatedPayment.dueAmount}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Membership Start Date:</strong> {selectedMember.startDate}</p>
                                        <p><strong>Membership End Date:</strong> {selectedMember.endDate}</p>
                                        <p>
                                            <strong>Payment Status:</strong>
                                            <span className={`ms-2 ${getStatusBadgeClass(updatedPayment.paymentStatus)}`}>
                                                {updatedPayment.paymentStatus}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Method Section */}
                                <div className="mt-4 p-3 bg-light rounded">
                                    <h6 className="fw-bold mb-3">Payment Method</h6>
                                    <div className="d-flex mb-3">
                                        <div className="form-check me-4">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="cashMethod"
                                                value="cash"
                                                checked={paymentMethod === 'cash'}
                                                onChange={() => handlePaymentMethodChange('cash')}
                                            />
                                            <label className="form-check-label" htmlFor="cashMethod">
                                                Cash (Manual Entry)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="paymentMethod"
                                                id="onlineMethod"
                                                value="online"
                                                checked={paymentMethod === 'online'}
                                                onChange={() => handlePaymentMethodChange('online')}
                                            />
                                            <label className="form-check-label" htmlFor="onlineMethod">
                                                Online (Automatically mark as Completed)
                                            </label>
                                        </div>
                                    </div>

                                    {paymentMethod === 'cash' && (
                                        <div className="mb-3">
                                            <label htmlFor="cashAmount" className="form-label">Enter Cash Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="cashAmount"
                                                value={cashAmount}
                                                onChange={handleCashAmountChange}
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary rounded-pill" onClick={closeViewModal}>
                                    <FaTimes className="me-2" />Cancel
                                </button>
                                {paymentMethod && (
                                    <button type="button" className="btn btn-success rounded-pill" onClick={savePaymentChanges}>
                                        <FaCheck className="me-2" />Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Membership;