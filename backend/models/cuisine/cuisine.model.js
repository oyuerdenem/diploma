import mongoose from "mongoose";
import { cuisineNameRegex } from "../validators";

const cuisineSchema = new mongoose.Schema(
  {
    cuisineId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      match: [
        cuisineNameRegex,
        "Cuisine name must be between 2 and 50 characters long and can only contain letters and spaces",
      ],
      minlength: 2,
      maxlength: 50,
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

const Cuisine = mongoose.model("Cuisine", cuisineSchema);

export default Cuisine;
