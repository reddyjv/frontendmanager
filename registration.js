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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4 p-md-5 w-100" style={{ maxWidth: '480px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="form-label fw-semibold">
              Name
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="name"
                type="text"
                name="name"
                className={`form-control ${formErrors.name ? 'is-invalid' : 'border-0'}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <div className="invalid-feedback">{formErrors.name}</div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold">
              Email ID
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                id="email"
                type="email"
                name="email"
                className={`form-control ${formErrors.email ? 'is-invalid' : 'border-0'}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              <div className="invalid-feedback">{formErrors.email}</div>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-4">
            <label htmlFor="dob" className="form-label fw-semibold">
              Date of Birth
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-calendar-alt"></i>
              </span>
              <input
                id="dob"
                type="date"
                name="dob"
                className={`form-control ${formErrors.dob ? 'is-invalid' : 'border-0'}`}
                value={formData.dob}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{formErrors.dob}</div>
            </div>
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobile" className="form-label fw-semibold">
              Mobile Number
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-phone"></i>
              </span>
              <input
                id="mobile"
                type="text"
                name="mobile"
                className={`form-control ${formErrors.mobile ? 'is-invalid' : 'border-0'}`}
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
              <div className="invalid-feedback">{formErrors.mobile}</div>
            </div>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="form-label fw-semibold">
              Age
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-hourglass-half"></i>
              </span>
              <input
                id="age"
                type="number"
                name="age"
                className={`form-control ${formErrors.age ? 'is-invalid' : 'border-0'}`}
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="1"
              />
              <div className="invalid-feedback">{formErrors.age}</div>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="form-label fw-semibold">
              Gender
            </label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-venus-mars"></i>
              </span>
              <select
                id="gender"
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
              <div className="invalid-feedback">{formErrors.gender}</div>
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-block">Role</label>
            <div className="d-flex gap-4 shadow-sm p-3 rounded border">
              <div className="form-check">
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
              <div className="form-check">
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
            {formErrors.role && <div className="text-danger mt-2 fw-semibold">{formErrors.role}</div>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group has-validation shadow-sm">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password"
                type="password"
                name="password"
                className={`form-control ${formErrors.password ? 'is-invalid' : 'border-0'}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 chars & special char"
              />
              <div className="invalid-feedback">{formErrors.password}</div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold shadow"
            disabled={!isFormValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
