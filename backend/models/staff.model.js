import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffId: { 
      type: Number, 
      required: [true, 'Staff ID is required'], 
      unique: true, // Ensure staffId is unique
    },
    name: { 
      type: String, 
      required: [true, 'Name is required'], 
      minlength: [3, 'Name must be at least 3 characters long'], // Minimum length
      maxlength: [100, 'Name must not exceed 100 characters'], // Maximum length
    },
    role: {
      type: String,
      enum: ["Manager", "Chef", "Waiter", "Cleaner", "Cashier", "Security"], 
      required: [true, 'Role is required'], // Validation message if required
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true, // Ensure email is unique
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'], // Regex for email validation
    },
    phoneNumber: { 
      type: String, 
      required: [true, 'Phone number is required'],
      match: [/^\+?[0-9]{10,15}$/, 'Phone number must be between 10 to 15 digits'], // Regex for phone number validation
    },
    hireDate: { 
      type: Date, 
      required: [true, 'Hire date is required'],
      validate: {
        validator: function(v) {
          return v <= new Date(); // Hire date must be on or before today
        },
        message: 'Hire date must be a current or past date',
      },
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, 'Branch ID is required'], // Validation message if required
    }, 
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
