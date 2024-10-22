import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find({});
    res.status(200).json({ success: true, data: cuisines });
  } catch (error) {
    console.error("Error on Get cuisines:", error.message);
    res.status(404).json({ success: false, error: "Failed to fetch cuisines" });
  }
};

export const createCuisine = async (req, res) => {
  const { name, description } = req.body;

  try {
    const lastCuisine = await Cuisine.findOne().sort({ cuisineId: -1 });
    const newCuisineId = lastCuisine ? lastCuisine.cuisineId + 1 : 1;

    const newCuisine = new Cuisine({
      cuisineId: newCuisineId,
      name,
      description,
    });

    await newCuisine.save();
    res.status(201).json({ success: true, data: newCuisine });
  } catch (error) {
    console.error("Error on Create cuisine:", error.message);
    res.status(400).json({ success: false, error: "Failed to create cuisine" });
  }
};

export const updateCuisine = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid cuisine ID" });
  }

  try {
    const updatedCuisine = await Cuisine.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCuisine });
  } catch (error) {
    console.error("Error on Update cuisine:", error.message);
    res.status(500).json({ success: false, error: "Failed to update cuisine" });
  }
};

// // Delete a cuisine
// export const deleteCuisine = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Invalid cuisine ID" });
//   }

//   try {
//     await Cuisine.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ success: true, message: "Cuisine deleted successfully" });
//   } catch (error) {
//     console.error("Error on Delete cuisine:", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete cuisine" });
//   }
// };
