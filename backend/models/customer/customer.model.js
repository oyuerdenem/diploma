import mongoose from "mongoose";
import { phoneNumberRegex } from "../validators";

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: Number,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [phoneNumberRegex, "Please enter a valid phone number"],
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.path("customerId").validate(async (value) => {
  const count = await mongoose.models.Customer.countDocuments({
    customerId: value,
  });
  return !count;
}, "Customer ID already exists.");

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
