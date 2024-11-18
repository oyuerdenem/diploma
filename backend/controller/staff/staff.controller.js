import Staff from "../../models/staff/staff.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Branch from "../../models/branch/branch.model.js";

export const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({});
    res.status(200).json({ success: true, data: staffs });
  } catch (error) {
    console.error("Error on Get staffs:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};

export const createStaff = async (req, res) => {
  const {
    name,
    role,
    email,
    phoneNumber,
    hireDate,
    branchId,
    password, 
  } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }

    const lastStaff = await Staff.findOne().sort({ staffId: -1 });
    const newStaffId = lastStaff ? lastStaff.staffId + 1 : 1; 

    const newStaff = new Staff({
      staffId: newStaffId,
      name,
      role,
      email,
      phoneNumber,
      hireDate,
      branchId: branchId,
      password, 
    });

    await newStaff.save();
    res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    console.error("Error on Create staff:", error.message);
    res.status(400).json({ success: false, error: "Failed to create staff" });
  }
};
