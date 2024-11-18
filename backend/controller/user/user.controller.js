import Branch from "../../models/branch/branch.model.js";
import User from "../../models/user/user.model.js";

export const addUser = async (req, res) => {
  const { branchId, username, password, role } = req.body;

  if (!["admin", "user", "staff"].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }
  if(role === "staff" && !branchId) {
    return res.status(400).json({ message: 'BranchId required.' });
  }

  try {
    if(role === "staff") {
      const branch = await Branch.findById(branchId);
      if (!branch) {
        return res
          .status(404)
          .json({ success: false, message: "Branch not found" });
      }
    }
    const newUser = new User({ branchId, username, password, role });
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
