import mongoose from "mongoose";
import bcrypt from "bcrypt";

const phoneNumberRegex = /^[0-9]{8}$/; // Matches exactly 8 digits

// Regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation

const staffSchema = new mongoose.Schema(
  {
    staffId: { 
      type: Number, 
      required: [true, 'Staff ID is required'], 
      unique: true,
    },
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name must not exceed 100 characters'],
    },
    role: {
      type: String,
      enum: ["Manager", "Chef", "Waiter", "Cleaner", "Cashier", "Security"], 
      required: [true, 'Role is required'],
    },
    email: { 
      type: String,
      required: true,
      match: [emailRegex, "Please enter a valid email address"], // Validates email format
    },
    phoneNumber: { 
      type: String,
      required: true,
      match: [phoneNumberRegex, "Please enter a valid 8-digit phone number"], // Validates phone number format
    },
    hireDate: { 
      type: Date, 
      required: [true, 'Hire date is required'],
      validate: {
        validator: function(v) {
          return v <= new Date();
        },
        message: 'Hire date must be a current or past date',
      },
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, 'Branch ID is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
staffSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
