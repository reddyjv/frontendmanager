import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    role: '',
    gender: '',
    age: '',
    mobile: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    dob: false,
    role: false,
    gender: false,
    age: false,
    mobile: false,
    password: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    validateFields(updatedForm);
  };

  const validateFields = (data) => {
    const errors = {
      name: data.name.trim() !== '',
      email: /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(data.email),
      dob: data.dob !== '',
      role: data.role !== '',
      gender: data.gender !== '',
      age: /^\d+$/.test(data.age) && parseInt(data.age) > 0,
      mobile: /^\d{10}$/.test(data.mobile),
      password: data.password.length >= 6 && /[!@#$%^&*]/.test(data.password)
    };

    setFormErrors(errors);
  };

  const isFormValid = Object.values(formErrors).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const dataToSend = { ...formData, password: hashedPassword };
      await axios.post('http://localhost:5000/api/users/register', dataToSend);
      alert("User registered successfully!");
      setFormData({
        name: '',
        email: '',
        dob: '',
        role: '',
        gender: '',
        age: '',
        mobile: '',
        password: ''
      });
      setFormErrors({
        name: false,
        email: false,
        dob: false,
        role: false,
        gender: false,
        age: false,
        mobile: false,
        password: false
      });
    } catch (error) {
      alert("Registration failed.");
      console.error(error);
    }
  };

  const renderInput = (label, name, type, icon, placeholder) => (
    <div className="form-group mb-3">
      <label>{label}</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className={`fas fa-${icon}`}></i>
        </span>
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
        />
      </div>
      {!formErrors[name] && formData[name] && (
        <small className="text-danger">Invalid {label.toLowerCase()}</small>
      )}
    </div>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-white" href="#">
            Automated <span style={{ color: 'maroon' }}>Billing System</span>
          </a>
        </div>
      </nav>

      <div className="container d-flex p-4 justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded bg-light shadow"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <h3 className="text-center mb-4">Register</h3>

          {renderInput('Name', 'name', 'text', 'user', 'Enter name')}
          {renderInput('Email ID', 'email', 'email', 'envelope', 'Enter email')}
          {renderInput('Date of Birth', 'dob', 'date', 'calendar', '')}
          {renderInput('Mobile Number', 'mobile', 'text', 'phone', '10-digit number')}
          {renderInput('Age', 'age', 'text', 'hourglass-half', 'Enter age')}

          <div className="form-group mb-3">
            <label>Gender</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-venus-mars"></i>
              </span>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {!formErrors.gender && formData.gender && (
              <small className="text-danger">Please select gender</small>
            )}
          </div>

          <div className="form-group mb-3">
            <label>Role</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  value="vendor"
                  checked={formData.role === 'vendor'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Vendor</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="role"
                  value="manager"
                  checked={formData.role === 'manager'}
                  onChange={handleChange}
                />
                <label className="form-check-label">Manager</label>
              </div>
            </div>
            {!formErrors.role && formData.role && (
              <small className="text-danger">Please select a role</small>
            )}
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars incl. special char"
              />
            </div>
            {!formErrors.password && formData.password && (
              <small className="text-danger">
                Password must be at least 6 characters and include a special character
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;


//npm install @fortawesome/fontawesome-free
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
