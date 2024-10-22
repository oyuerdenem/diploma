import Staff from "../models/staff.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Branch from "../models/branch.model.js";

export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({});
    res.status(200).json({ success: true, data: staffs });
  } catch (error) {
    console.error("Error on Get staffs:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};
// Create a new staff member
export const createStaff = async (req, res) => {
  const {
    staffId,
    name,
    role,
    email,
    phoneNumber,
    hireDate,
    branchId,
    password, // Include password for hashing
  } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }

    const lastStaff = await Staff.findOne().sort({ staffId: -1 });
    const newStaffId = lastStaff ? lastStaff.staffId + 1 : 1; // Start with 1 if no branches exist

    const newStaff = new Staff({
      staffId: newStaffId,
      name,
      role,
      email,
      phoneNumber,
      hireDate,
      branchId: branchId,
      password, // Store the password directly, it will be hashed in the model
    });

    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    console.error("Error on Create staff:", error.message);
    res.status(400).json({ success: false, error: "Failed to create staff" });
  }
};

export const loginStaff = async (req, res) => {
  const { name, password } = req.body;

  try {
    const staff = await Staff.findOne({ name });
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }
    );

    res.status(200).json({ success: true, token }); // Send token back to client
  } catch (error) {
    console.error("Error on Staff login:", error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Staff login
// export const staffLogin = async (req, res) => {
//   const { email, password } = req.body;

//   // Get the user's IP address
//   const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

//   try {
//     const staffMember = await Staff.findOne({ email });
//     if (!staffMember) {
//       return res.status(404).json({ success: false, message: "Staff not found" });
//     }

//     const isMatch = await bcrypt.compare(password, staffMember.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

//     // Log the IP address
//     console.log(`User logged in from IP: ${ipAddress}`);

//     // Generate a token
//     const token = jwt.sign({ id: staffMember._id, role: staffMember.role }, process.env.JWT_SECRET, { expiresIn: "10h" });

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     console.error("Error on Staff login:", error.message);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// };
