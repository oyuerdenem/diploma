import mongoose from "mongoose";

// Regular expression for validating menu item names
const menuItemNameRegex = /^[a-zA-Z0-9\s]{2,50}$/; // Allows alphanumeric characters and spaces, between 2 and 50 characters

const menuItemSchema = new mongoose.Schema(
  {
    menuId: { 
      type: Number, 
      required: true, 
      unique: true // Ensure menuId is unique
    },
    name: { 
      type: String, 
      required: true,
      match: [menuItemNameRegex, 'Menu item name must be between 2 and 50 characters long and can contain letters, numbers, and spaces'], // Validates name format
      minlength: 2, // Minimum length of 2 characters
      maxlength: 50, // Maximum length of 50 characters
    },
    description: { 
      type: String,
      maxlength: 200, // Maximum length of 200 characters
    },
    price: { 
      type: Number, 
      required: true, 
      min: [0, 'Price must be a positive number'], // Price must be positive
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    cuisineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "Out of Stock", "Limited"],
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
