import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import Category from "../../models/category/category.model.js";
import MenuItem from "../../models/menuItem/menuItem.model.js";

export const getMenuItems = async (req, res) => {
  try {
    const menuItem = await MenuItem.find({});
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    console.error("Error on Get menu item:", error.message);
    res
      .status(404)
      .json({ success: false, error: "Failed to fetch menu item" });
  }
};

export const getAllCuisinesWithPrices = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({}).populate({
      path: "cuisineId",
      select: "name description categoryId",
    });

    const categoryItems = await Category.find({}).populate({
      path: "categoryId",
      select: "categoryId",
    });

    if (!menuItems.length) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
      });
    }

    const result = menuItems.map((item) => {
      const category = categoryItems.find(
        (category) =>
          category._id.toString() === item.cuisineId?.categoryId.toString()
      );

      return {
        cuisineName: item.cuisineId?.name || "Unknown",
        cuisineDesc: item.cuisineId?.description || "Unknown",
        category: category,
        availabilityStatus: item.availabilityStatus || false,
        stockNumber: item.stock || 0,
        price: item.price,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error on Get all cuisines with prices:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch cuisines with prices" });
  }
};

export const createMenuItem = async (req, res) => {
  const { cuisineId, price } = req.body;

  try {
    const cuisine = await Cuisine.findById(cuisineId);
    if (!cuisine) {
      return res
        .status(404)
        .json({ success: false, message: "Cuisine not found." });
    }
    const lastMenuItem = await MenuItem.findOne().sort({ menuItemId: -1 });
    const newMenuItemId = lastMenuItem ? lastMenuItem.menuItemId + 1 : 1;

    const newMenuItem = new MenuItem({
      cuisineId: cuisineId,
      menuItemId: newMenuItemId,
      price: price,
    });

    await newMenuItem.save();
    res.status(201).json({ success: true, data: newMenuItem });
  } catch (error) {
    console.error("Error on Create menu item:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to create menu item" });
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid MenuItem ID" });
  }

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedMenuItem });
  } catch (error) {
    console.error("Error on Update MenuItem:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to update MenuItem" });
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid MenuItem ID" });
  }

  try {
    await MenuItem.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "MenuItem deleted successfully" });
  } catch (error) {
    console.error("Error on Delete MenuItem:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete MenuItem" });
  }
};
