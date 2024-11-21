import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return value <= Date.now();
        },
        message: "Order date cannot be in the future",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount must be a positive number"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Delivered"],
      required: true,
    },
    option: {
      type: String,
      enum: ["Dinein", "Takeout"],
      required: true,
    },
    qrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TableQr",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
