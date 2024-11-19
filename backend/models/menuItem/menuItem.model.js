import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  { 
    menuItemId: {
      type: Number,
      required: true,
      unique: true,
    },
    cuisineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },   
    availabilityStatus: {
      type: String,
      enum: ["Available", "Out of Stock", "Limited"],
    },
    stockNumber: {
      type: Number,
      min: [0, "Stock number must be a positive number"],
    }, 
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
