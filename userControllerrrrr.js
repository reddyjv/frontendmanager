const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Function to generate next employee ID
const generateEmployeeId = async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    if (!lastUser || !lastUser.employeeId) {
        return 'EMP1001';
    }
    const lastId = parseInt(lastUser.employeeId.replace('EMP', ''));
    const newId = lastId + 1;
    return `EMP${newId}`;
};

const registerUser = async (req, res) => {
    try {
        const { name, email, dob, gender, role, password, mobile, age } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate Employee ID
        const employeeId = await generateEmployeeId();

        const newUser = new User({
            employeeId,
            name,
            email,
            dob,
            gender,
            role,
            password: hashedPassword,
            mobile,
            age
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', employeeId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };
