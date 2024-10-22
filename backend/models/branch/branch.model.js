import mongoose from "mongoose";

// Regular expression for validating phone numbers (8 digits)
const phoneNumberRegex = /^[0-9]{8}$/; // Matches exactly 8 digits

// Regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

const branchSchema = new mongoose.Schema(
  {
    branchId: {
      type: Number,
      required: true,
      unique: true, // Ensure branchId is unique
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    branchName: {
      type: String,
      required: true,
      minlength: 2, // Minimum length of 2 characters
    },
    location: {
      type: String,
      required: true,
      minlength: 5, // Minimum length of 5 characters
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [phoneNumberRegex, "Please enter a valid 8-digit phone number"], // Validates phone number format
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Please enter a valid email address"], // Validates email format
    },
    operatingHours: {
      openingTime: {
        type: String,
        required: true,
      },
      closingTime: {
        type: String,
        required: true,
      },
    },
    capacity: {
      type: Number,
      required: true,
      min: 1, // Minimum capacity of 1
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Under Maintenance"],
      required: true,
    },
    branchRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    deliveryOptions: {
      type: [String],
      enum: ["Pickup", "Delivery", "Dine-in"],
      required: true,
    },
    images: {
      type: [String],
    },
    socialMediaLinks: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
