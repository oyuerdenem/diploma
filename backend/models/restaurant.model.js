import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    id: { 
      type: Number, 
      required: [true, 'Restaurant ID is required'], 
      unique: true, // Ensure the restaurant ID is unique
    },
    name: { 
      type: String, 
      required: [true, 'Restaurant name is required'], // Validation message if required
      minlength: [3, 'Restaurant name must be at least 3 characters long'], // Minimum length
      maxlength: [100, 'Restaurant name must not exceed 100 characters'], // Maximum length
    },
    cuisineId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Cuisine',
      required: [true, 'Cuisine ID is required'], // Validation message if required
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
