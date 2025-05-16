\import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // For icon styling

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

  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value) ? '' : 'Invalid email';
      case 'dob':
        return value ? '' : 'Date of birth is required';
      case 'role':
        return value ? '' : 'Please select a role';
      case 'gender':
        return value ? '' : 'Please select gender';
      case 'age':
        return /^\d+$/.test(value) && parseInt(value) > 0 ? '' : 'Enter a valid age';
      case 'mobile':
        return /^\d{10}$/.test(value) ? '' : 'Enter 10-digit number';
      case 'password':
        if (value.length < 6) return 'Min 6 characters';
        if (!/[!@#$%^&*]/.test(value)) return 'Add a special character';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isFormValid =
    Object.values(formErrors).every(err => err === '') &&
    Object.values(formData).every(field => field !== '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      await axios.post('http://localhost:5000/api/users/register', {
        ...formData,
        password: hashedPassword
      });
      alert('Registered successfully!');
    } catch (err) {
      alert('Error registering');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light min-vh-100">
      <div className="p-5 shadow rounded bg-white" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4 text-primary fw-bold">Register</h3>
        <form onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Name</label>
            <i className="fa fa-user icon-inside"></i>
            <input
              type="text"
              name="name"
              className={`form-control ps-5 ${formErrors.name ? 'is-invalid' : ''}`}
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </div>

          {/* Email */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Email</label>
            <i className="fa fa-envelope icon-inside"></i>
            <input
              type="email"
              name="email"
              className={`form-control ps-5 ${formErrors.email ? 'is-invalid' : ''}`}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>

          {/* Date of Birth */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Date of Birth</label>
            <i className="fa fa-calendar icon-inside"></i>
            <input
              type="date"
              name="dob"
              className={`form-control ps-5 ${formErrors.dob ? 'is-invalid' : ''}`}
              value={formData.dob}
              onChange={handleChange}
            />
            {formErrors.dob && <div className="invalid-feedback">{formErrors.dob}</div>}
          </div>

          {/* Mobile */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Mobile</label>
            <i className="fa fa-phone icon-inside"></i>
            <input
              type="text"
              name="mobile"
              className={`form-control ps-5 ${formErrors.mobile ? 'is-invalid' : ''}`}
              placeholder="10-digit number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {formErrors.mobile && <div className="invalid-feedback">{formErrors.mobile}</div>}
          </div>

          {/* Age */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Age</label>
            <i className="fa fa-hourglass icon-inside"></i>
            <input
              type="number"
              name="age"
              className={`form-control ps-5 ${formErrors.age ? 'is-invalid' : ''}`}
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
            />
            {formErrors.age && <div className="invalid-feedback">{formErrors.age}</div>}
          </div>

          {/* Gender */}
          <div className="form-group mb-4">
            <label className="fw-semibold">Gender</label>
            <select
              name="gender"
              className={`form-control ${formErrors.gender ? 'is-invalid' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && <div className="invalid-feedback">{formErrors.gender}</div>}
          </div>

          {/* Role */}
          <div className="form-group mb-4">
            <label className="fw-semibold">Role</label><br />
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
            {formErrors.role && <div className="text-danger mt-1">{formErrors.role}</div>}
          </div>

          {/* Password */}
          <div className="form-group mb-4 position-relative">
            <label className="fw-semibold">Password</label>
            <i className="fa fa-lock icon-inside"></i>
            <input
              type="password"
              name="password"
              className={`form-control ps-5 ${formErrors.password ? 'is-invalid' : ''}`}
              placeholder="Min 6 chars incl. special char"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
