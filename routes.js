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

    // ✅ Reset form and errors
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

    setFormErrors({});

  } catch (err) {
    alert('Error registering');
    console.error(err);
  }
};
