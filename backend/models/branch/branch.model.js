import mongoose from "mongoose";
import { emailRegex, phoneNumberRegex } from "../validators.js";

const branchSchema = new mongoose.Schema(
  {
    branchId: {
      type: Number,
      required: true,
      unique: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    branchName: {
      type: String,
      required: true,
      minlength: 2,
    },
    location: {
      type: String,
      required: true,
      minlength: 5,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [phoneNumberRegex, "Please enter a valid 8-digit phone number"],
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Please enter a valid email address"],
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
      min: 1,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Under Maintenance"],
    },
    branchRating: {
      type: Number,
      min: 0,
      max: 5,
    },
    deliveryOptions: {
      type: [String],
      enum: ["Pickup", "Delivery", "Dine-in"],
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
