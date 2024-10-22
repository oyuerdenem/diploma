import mongoose from "mongoose";

// Regular expression for validating cuisine names
const cuisineNameRegex = /^[a-zA-Z\s]{2,50}$/; // Allows letters and spaces, between 2 and 50 characters

const cuisineSchema = new mongoose.Schema(
  {
    cuisineId: { 
      type: Number, 
      required: true, 
      unique: true, // Ensure cuisineId is unique
    },
    name: { 
      type: String, 
      required: true,
      match: [cuisineNameRegex, 'Cuisine name must be between 2 and 50 characters long and can only contain letters and spaces'], // Validates name format
      minlength: 2, // Minimum length of 2 characters
      maxlength: 50, // Maximum length of 50 characters
    },
    description: { 
      type: String,
      maxlength: 200, // Maximum length of 200 characters
    },
  },
  {
    timestamps: true,
  }
);

const Cuisine = mongoose.model("Cuisine", cuisineSchema);

export default Cuisine;
