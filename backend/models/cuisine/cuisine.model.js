import mongoose from "mongoose";
import { cuisineNameRegex } from "../validators.js";

const cuisineSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
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
    // image: {
    //   type: String,
    //   required: [true, "Image is required"],
    //   validate: {
    //     validator: function (value) {
    //       // Regex to match valid image file extensions
    //       return /\.(jpg|jpeg|png)$/i.test(value);
    //     },
    //     message: "Image must be a valid file with .jpg, .jpeg, .png extension",
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

const Cuisine = mongoose.model("Cuisine", cuisineSchema);

export default Cuisine;
