import mongoose from "mongoose";
import { categoryNameRegex } from "../validators.js";

const categorySchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Branch ID is required"],
    },
    categoryId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      match: [
        categoryNameRegex,
        "Cuisine name must be between 2 and 50 characters long and can only contain letters and spaces",
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

const Category = mongoose.model("Category", categorySchema);

export default Category;
