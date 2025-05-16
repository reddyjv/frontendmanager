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
      const hashedPassword = await bcrypt.hash(formData.
