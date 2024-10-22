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
      required: true,
    },
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    itemPrice: {
      type: Number,
      required: true,
      min: [0, "Item price must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
