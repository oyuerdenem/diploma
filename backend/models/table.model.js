import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableId: { 
      type: Number, 
      required: [true, 'Table ID is required'], 
      unique: true, // Ensure tableId is unique
      min: [1, 'Table ID must be a positive integer'], // Minimum value for tableId
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, 'Branch ID is required'], // Validation message if required
    }, 
    tableNumber: { 
      type: Number, 
      required: [true, 'Table number is required'], 
      unique: true, // Ensure tableNumber is unique within a branch
      min: [1, 'Table number must be a positive integer'], // Minimum value for tableNumber
    },
    seats: { 
      type: Number, 
      required: [true, 'Number of seats is required'], 
      min: [1, 'Seats must be at least 1'], // Minimum value for seats
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved", "Out of Service"],
      required: [true, 'Status is required'], // Validation message if required
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
