import React, { useState } from "react";
import { Table, Button, Modal, Form, Badge, Container, Row, Col, Card } from "react-bootstrap";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access to all features",
      permissions: ["Dashboard", "Manage Users", "Reports"],
      status: "Active",
    },
    {
      id: 2,
      name: "Manager",
      description: "Manage team and view reports",
      permissions: ["Dashboard", "Manage Members", "Reports"],
      status: "Active",
    },
    {
      id: 3,
      name: "Receptionist",
      description: "Manage check-ins and payments",
      permissions: ["Attendance", "Payments"],
      status: "Inactive",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // 'edit', 'view', 'add'
  const [editingRole, setEditingRole] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const filteredRoles =
    filter === "All" ? roles : roles.filter((role) => role.status === filter);

  const handleShowModal = (role = null, mode = "edit") => {
    setEditingRole(role);
    setModalMode(mode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingRole(null);
    setShowModal(false);
  };

  const handleSaveRole = () => {
    // For demo: just close modal
    // In real app, you'd update state here
    setShowModal(false);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      setRoles(prev => prev.filter(r => r.id !== roleToDelete.id));
    }
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  // Render role cards for mobile view
  const renderRoleCards = () => {
    return (
      <Row className="g-3">
        {filteredRoles.map((role) => (
          <Col xs={12} sm={6} key={role.id}>
            <Card className="h-100">
              <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: "#2f6a87", color: "#fff" }}>
                <Card.Title className="mb-0">{role.name}</Card.Title>
                <div>
                  <Button
                    variant="outline-light"
                    size="sm"
                    title="View"
                    onClick={() => handleShowModal(role, "view")}
                    className="me-1"
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    title="Edit"
                    onClick={() => handleShowModal(role, "edit")}
                    className="me-1"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    title="Delete"
                    onClick={() => handleDeleteClick(role)}
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <p className="mb-2"><strong>Description:</strong> {role.description}</p>
                <p className="mb-2"><strong>Status:</strong> 
                  <Badge
                    bg={role.status === "Active" ? "success" : "danger"}
                    className="ms-2"
                  >
                    {role.status}
                  </Badge>
                </p>
                <p className="mb-0"><strong>Permissions:</strong></p>
                <div className="mt-2">
                  {role.permissions.map((perm, index) => (
                    <Badge
                      key={index}
                      bg="primary"
                      className="me-2 mb-2"
                    >
                      {perm}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col xs={12} md={8}>
          <h2 style={{ color: "#2f6a87" }}>Role Management</h2>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end mt-3 mt-md-0">
          <Button
            onClick={() => handleShowModal(null, "edit")}
            style={{ backgroundColor: "#2f6a87", border: "none" }}
            className="px-4 w-100 w-md-auto"
          >
            Add Role
          </Button>
        </Col>
      </Row>

      {/* Filter Buttons */}
      <Row className="mb-4">
        <Col xs={12}>
          <div className="d-flex flex-wrap">
            {["All", "Active", "Inactive"].map((f) => (
              <Button
                key={f}
                variant={filter === f ? "primary" : "outline-secondary"}
                onClick={() => setFilter(f)}
                className="me-2 mb-2"
                style={{ 
                  backgroundColor: filter === f ? "#2f6a87" : "transparent",
                  borderColor: filter === f ? "#2f6a87" : "#6c757d",
                  color: filter === f ? "#fff" : "#6c757d"
                }}
              >
                {f}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Roles Table for desktop, Cards for mobile */}
      <div className="d-none d-lg-block">
        <div className="table-responsive">
          <Table bordered hover className="align-middle mb-0">
            <thead style={{ backgroundColor: "#2f6a87", color: "#fff" }}>
              <tr>
                <th>Role Name</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>Status</th>
                <th className="text-center" style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>
                    {role.permissions.map((perm, index) => (
                      <Badge
                        key={index}
                        bg="primary"
                        className="me-2 mb-2"
                      >
                        {perm}
                      </Badge>
                    ))}
                  </td>
                  <td>
                    <Badge
                      bg={role.status === "Active" ? "success" : "danger"}
                    >
                      {role.status}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-1" style={{ whiteSpace: 'nowrap' }}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        title="View"
                        onClick={() => handleShowModal(role, "view")}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-info"
                        size="sm"
                        title="Edit"
                        onClick={() => handleShowModal(role, "edit")}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        title="Delete"
                        onClick={() => handleDeleteClick(role)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="d-lg-none">
        {renderRoleCards()}
      </div>

      {/* Add/Edit/View Role Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" fullscreen="sm-down">
        <Modal.Header style={{ backgroundColor: "#2f6a87", color: "#fff" }} closeButton>
          <Modal.Title>
            {modalMode === "add" || !editingRole
              ? "Add Role"
              : modalMode === "view"
                ? "View Role"
                : "Edit Role"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                defaultValue={editingRole?.name || ""}
                readOnly={modalMode === "view"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                defaultValue={editingRole?.description || ""}
                readOnly={modalMode === "view"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {["Dashboard", "Manage Users", "Reports", "Payments", "Attendance"].map((perm) => (
                  <Form.Check
                    key={perm}
                    type="checkbox"
                    label={perm}
                    defaultChecked={editingRole?.permissions?.includes(perm)}
                    disabled={modalMode === "view"}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                defaultValue={editingRole?.status || "Active"}
                disabled={modalMode === "view"}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {modalMode === "view" ? "Close" : "Cancel"}
          </Button>
          {modalMode !== "view" && (
            <Button
              variant="info"
              style={{ backgroundColor: "#2f6a87", border: "none" }}
              onClick={handleSaveRole}
            >
              {editingRole ? "Update Role" : "Add Role"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the role <strong>"{roleToDelete?.name}"</strong>?<br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RoleManagement;