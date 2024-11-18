import mongoose from "mongoose";
import Category from "../../models/category/category.model.js";
import Branch from "../../models/branch/branch.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("Error on Get categories:", error.message);
    res.status(404).json({ success: false, error: "Failed to fetch category" });
  }
};

export const createCategory = async (req, res) => {
  const { branchId, name, description} = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    const lastCategory = await Category.findOne().sort({ categoryId: -1 });
    const newCategoryId = lastCategory ? lastCategory.categoryId + 1 : 1;

    const newCategory = new Category({
      categoryId: newCategoryId,
      branchId: branch.id,
      name,
      description
    });

    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.error("Error on Create category:", error.message);
    res.status(400).json({ success: false, error: "Failed to create category" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid category ID" });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Error on Update category:", error.message);
    res.status(500).json({ success: false, error: "Failed to update category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid category ID" });
  }

  try {
    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error on Delete category:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};
