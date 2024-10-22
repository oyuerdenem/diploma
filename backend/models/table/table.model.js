import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableId: {
      type: Number,
      required: [true, "Table ID is required"],
      unique: true,
      min: [1, "Table ID must be a positive integer"],
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Branch ID is required"],
    },
    tableNumber: {
      type: Number,
      required: [true, "Table number is required"],
      unique: true,
      min: [1, "Table number must be a positive integer"],
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [1, "Seats must be at least 1"],
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved", "Out of Service"],
      required: [true, "Status is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
