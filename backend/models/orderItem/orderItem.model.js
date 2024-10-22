import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderItemId: { 
      type: Number, 
      required: true, 
      unique: true, // Ensure orderItemId is unique
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
      min: [1, 'Quantity must be at least 1'], // Quantity must be a positive integer
    },
    itemPrice: { 
      type: Number, 
      required: true, 
      min: [0, 'Item price must be a positive number'], // Item price must be positive
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
