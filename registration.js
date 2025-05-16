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
    name: '',
    email: '',
    dob: '',
    role: '',
    gender: '',
    age: '',
    mobile: '',
    password: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        return '';
      case 'email':
        if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value))
          return 'Enter a valid email';
        return '';
      case 'dob':
        if (!value) return 'Date of birth is required';
        return '';
      case 'role':
        if (!value) return 'Please select a role';
        return '';
      case 'gender':
        if (!value) return 'Please select gender';
        return '';
      case 'age':
        if (!/^\d+$/.test(value) || parseInt(value) <= 0)
          return 'Enter a valid age';
        return '';
      case 'mobile':
        if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit mobile number';
        return '';
      case 'password':
        if (value.length < 6)
          return 'Password must be at least 6 characters';
        if (!/[!@#$%^&*]/.test(value))
          return 'Password must include a special character';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const isFormValid =
    Object.values(formErrors).every((error) => error === '') &&
    Object.values(formData).every((field) => field !== '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const dataToSend = { ...formData, password: hashedPassword };

      await axios.post('http://localhost:5000/api/users/register', dataToSend);
      alert('User registered successfully!');

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
        name: '',
        email: '',
        dob: '',
        role: '',
        gender: '',
        age: '',
        mobile: '',
        password: ''
      });
    } catch (error) {
      alert('Registration failed.');
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit} noValidate>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              name="name"
              className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          {formErrors.name && <div className="invalid-feedback d-block">{formErrors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email ID</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          {formErrors.email && <div className="invalid-feedback d-block">{formErrors.email}</div>}
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="dob"
              className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          {formErrors.dob && <div className="invalid-feedback d-block">{formErrors.dob}</div>}
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-phone"></i>
            </span>
            <input
              type="text"
              name="mobile"
              className={`form-control ${formErrors.mobile ? 'is-invalid' : ''}`}
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit number"
            />
          </div>
          {formErrors.mobile && <div className="invalid-feedback d-block">{formErrors.mobile}</div>}
        </div>

        {/* Age */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-hourglass-half"></i>
            </span>
            <input
              type="text"
              name="age"
              className={`form-control ${formErrors.age ? 'is-invalid' : ''}`}
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
            />
          </div>
          {formErrors.age && <div className="invalid-feedback d-block">{formErrors.age}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-venus-mars"></i>
            </span>
            <select
              name="gender"
              className={`form-select ${formErrors.gender ? 'is-invalid' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {formErrors.gender && <div className="invalid-feedback d-block">{formErrors.gender}</div>}
        </div>

        {/* Role */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className={`form-check-input ${formErrors.role ? 'is-invalid' : ''}`}
                name="role"
                value="vendor"
                checked={formData.role === 'vendor'}
                onChange={handleChange}
                id="roleVendor"
              />
              <label className="form-check-label" htmlFor="roleVendor">
                Vendor
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className={`form-check-input ${formErrors.role ? 'is-invalid' : ''}`}
                name="role"
                value="manager"
                checked={formData.role === 'manager'}
                onChange={handleChange}
                id="roleManager"
              />
              <label className="form-check-label" htmlFor="roleManager">
                Manager
              </label>
            </div>
          </div>
          {formErrors.role && <div className="text-danger mt-1">{formErrors.role}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
      <div className="input-group">
        <span className="input-group-text">
          <i className="fas fa-lock"></i>
        </span>
        <input
          type="password"
          name="password"
          className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      {formErrors.password && <div className="invalid-feedback d-block">{formErrors.password}</div>}
    </div>

    <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
      Register
    </button>
  </form>
</div>
);
}

export default Register;

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
