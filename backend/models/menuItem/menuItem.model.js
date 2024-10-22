import mongoose from "mongoose";
import { menuItemNameRegex } from "../validators";

const menuItemSchema = new mongoose.Schema(
  {
    menuId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      match: [
        menuItemNameRegex,
        "Menu item name must be between 2 and 50 characters long and can contain letters, numbers, and spaces",
      ],
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
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
