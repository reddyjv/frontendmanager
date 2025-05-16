const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Generate next employeeId like EMP1001, EMP1002...
const generateEmployeeId = async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    if (!lastUser || !lastUser.employeeId) {
        return 'EMP1001';
    }
    const lastId = parseInt(lastUser.employeeId.replace('EMP', ''));
    return `EMP${lastId + 1}`;
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, dob, gender, role, password, mobile, age } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const employeeId = await generateEmployeeId();

        const newUser = new User({
            employeeId,
            name,
            email,
            dob,
            gender,
            role,
            password, // Already hashed
            mobile,
            age
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', employeeId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
