import mongoose from "mongoose";
import Restaurant from "../../models/restaurant/restaurant.model.js";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import CuisineType from "../../models/cuisineType/cuisineType.model.js";

export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    console.error("Error on Get restaurants:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};

export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const restaurant = await Restaurant.findById(id).populate("cuisineId");
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, error: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error on Get restaurant:", error.message);
    res.status(404).json({ success: false, error: "Server error" });
  }
};

export const createRestaurant = async (req, res) => {
  const { name, cuisineTypeId } = req.body;

  try {
    const cuisine = await CuisineType.findById(cuisineTypeId);
    if (!cuisine) {
      return res
        .status(404)
        .json({ success: false, message: "Cuisine type not found" });
    }

    const lastRestaurant = await Restaurant.findOne().sort({ id: -1 });
    const newId = lastRestaurant ? lastRestaurant.id + 1 : 1; 

    const newRestaurant = new Restaurant({
      id: newId,
      name,
      cuisineTypeId: cuisineTypeId,
    });

    await newRestaurant.save();
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    console.error("Error on Create restaurant:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to create restaurant" });
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("cuisineId");
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, error: "Restaurant not found" });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Error on Update restaurant:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to update restaurant" });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product Id" });
  }

  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, error: "Restaurant not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error on Delete restaurant:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to delete restaurant" });
  }
};
