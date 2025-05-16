const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    age: { type: Number, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
