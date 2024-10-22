// controllers/userController.js

import User from "../models/user.model.js";

// Function to add a new user (staff)
export const addUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if role is valid
  if (!["admin", "user", "staff"].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
};

// Function to get all users (could be filtered based on role)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({success: true, users});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

// Function to get a specific user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
};
