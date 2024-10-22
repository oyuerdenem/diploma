import User from "../../models/user/user.model.js";

export const addUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!["admin", "user", "staff"].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(200).json({ success: true, newUser});
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
    console.log(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({success: true, users});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

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
