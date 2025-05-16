// ==== FRONTEND (React) ====
// File: ManageEmployees.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const fetchEmployees = async () => {
    const { data } = await axios.get('/api/employees');
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setAlert({ show: true, message: 'Employee deleted successfully!', variant: 'success' });
      fetchEmployees();
    } catch {
      setAlert({ show: true, message: 'Failed to delete employee.', variant: 'danger' });
    }
    setTimeout(() => setAlert({ show: false }), 2000);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/employees/${selectedEmployee._id}`, selectedEmployee);
      setAlert({ show: true, message: 'Employee updated successfully!', variant: 'success' });
      fetchEmployees();
      setShowModal(false);
    } catch {
      setAlert({ show: true, message: 'Failed to update employee.', variant: 'danger' });
    }
    setTimeout(() => setAlert({ show: false }), 2000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Employees</h2>

      {alert.show && (
        <div className={`alert alert-${alert.variant} animate__animated animate__fadeIn`}>
          <i className={`bi bi-${alert.variant === 'success' ? 'check-circle' : 'x-circle'}`}></i> {alert.message}
        </div>
      )}

      <div className="row">
        {employees.map((employee) => (
          <div key={employee._id} className="col-md-4 mb-3">
            <div className="card shadow rounded">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{employee.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text"><strong>Email:</strong> {employee.email}</p>
                <p className="card-text"><strong>Phone:</strong> {employee.phone}</p>
                <p className="card-text"><strong>Company:</strong> {employee.company}</p>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedEmployee && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Name" value={selectedEmployee.name} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} required />
                <input type="email" className="form-control mb-2" value={selectedEmployee.email} disabled />
                <input type="text" className="form-control mb-2" placeholder="Phone" value={selectedEmployee.phone} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })} required />
                <input type="text" className="form-control mb-2" placeholder="Company" value={selectedEmployee.company} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, company: e.target.value })} required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEmployees;
