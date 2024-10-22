import mongoose from "mongoose";
import Branch from "../../models/branch/branch.model.js";
import Restaurant from "../../models/restaurant/restaurant.model.js";

export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({});
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error("Error on Get branches:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};

export const getBranchById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, error: "Branch not found" });
    }
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error("Error on Get branch:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};

export const createBranch = async (req, res) => {
  const {
    restaurantId,
    branchName,
    location,
    phoneNumber,
    email,
    operatingHours,
    capacity,
    status,
    branchRating,
    deliveryOptions,
    images,
    socialMediaLinks,
  } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const lastBranch = await Branch.findOne().sort({ branchId: -1 });
    const newBranchId = lastBranch ? lastBranch.branchId + 1 : 1; 

    const newBranch = new Branch({
      branchId: newBranchId,
      restaurantId: restaurantId,
      branchName,
      location,
      phoneNumber,
      email,
      operatingHours,
      capacity,
      status,
      branchRating,
      deliveryOptions,
      images,
      socialMediaLinks,
    });

    await newBranch.save();
    res.status(201).json({ success: true, data: newBranch });
  } catch (error) {
    console.error("Error on Create branch:", error.message);
    res.status(400).json({ success: false, error: "Failed to create branch" });
  }
};

export const updateBranch = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const branch = await Branch.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, error: "Branch not found" });
    }
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    console.error("Error on Update branch:", error.message);
    res.status(400).json({ success: false, error: "Failed to update branch" });
  }
};

export const deleteBranch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const branch = await Branch.findByIdAndDelete(id);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, error: "Branch not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Error on Delete branch:", error.message);
    res.status(400).json({ success: false, error: "Failed to delete branch" });
  }
};
