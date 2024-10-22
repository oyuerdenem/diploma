// controller/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Staff from '../models/staff.model.js';  // Import your Staff model

// Login controller
export const loginStaff = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find staff by name
    const staff = await Staff.findOne({ name });
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME, // Token expiration time
    });
    console.log(process.env.JWT_SECRET,process.env.JWT_EXPIRATION_TIME);

    // Return success and token
    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    console.error('Error on staff login:', error.message);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
