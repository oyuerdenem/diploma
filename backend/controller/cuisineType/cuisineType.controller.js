import mongoose from "mongoose";
import CuisineType from "../../models/cuisineType/cuisineType.model.js";
import Branch from "../../models/branch/branch.model.js";

export const getCuisineTypes = async (req, res) => {
  try {
    const cuisineTypes = await CuisineType.find({});
    res.status(200).json({ success: true, data: cuisineTypes });
  } catch (error) {
    console.error("Error on Get cuisine types:", error.message);
    res.status(404).json({ success: false, error: "Failed to fetch cuisine types" });
  }
};

export const createCuisineType = async (req, res) => {
  const { name, description} = req.body;

  try {
    const lastCuisineType = await CuisineType.findOne().sort({ cuisineTypeId: -1 });
    const newCuisineTypeId = lastCuisineType ? lastCuisineType.cuisineTypeId + 1 : 1;

    const newCuisineType = new CuisineType({
      cuisineTypeId: newCuisineTypeId,
      name,
      description
    });

    await newCuisineType.save();
    res.status(201).json({ success: true, data: newCuisineType });
  } catch (error) {
    console.error("Error on Create cuisine type:", error.message);
    res.status(400).json({ success: false, error: "Failed to create cuisine type" });
  }
};

export const updateCuisineType = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid cuisine type ID" });
  }

  try {
    const updatedCuisineType = await CuisineType.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCuisineType });
  } catch (error) {
    console.error("Error on Update cuisine type:", error.message);
    res.status(500).json({ success: false, error: "Failed to update cuisine type" });
  }
};

export const deleteCuisineType = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid cuisine type ID" });
  }

  try {
    await CuisineType.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Cuisine type deleted successfully" });
  } catch (error) {
    console.error("Error on Delete cuisine type:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete cuisine type" });
  }
};
