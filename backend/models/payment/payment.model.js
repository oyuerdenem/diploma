import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderItemId: {
      type: Number,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: [true, "Menu Item ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    itemPrice: {
      type: Number,
      required: [true, "Item price is required"],
      min: [0, "Item price must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
