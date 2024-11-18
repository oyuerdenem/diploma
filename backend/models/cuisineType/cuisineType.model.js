import mongoose from "mongoose";
import { cuisineTypeNameRegex } from "../validators.js";

const cuisineTypeSchema = new mongoose.Schema(
  {
    cuisineTypeId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      match: [
        cuisineTypeNameRegex,
        "Cuisine type name must be between 2 and 50 characters long and can only contain letters and spaces",
      ],
      minlength: 2,
      maxlength: 25,
    },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

const CuisineType = mongoose.model("CuisineType", cuisineTypeSchema);

export default CuisineType;
