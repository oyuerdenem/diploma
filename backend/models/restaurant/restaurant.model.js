import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Restaurant ID is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      minlength: [3, "Restaurant name must be at least 3 characters long"],
      maxlength: [100, "Restaurant name must not exceed 100 characters"],
    },
    cuisineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
      required: [true, "Cuisine ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
