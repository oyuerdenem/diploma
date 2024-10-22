import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { 
      type: Number, 
      required: true, 
      unique: true, // Ensure orderId is unique
    }, 
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    }, 
    orderDate: { 
      type: Date, 
      default: Date.now, 
      validate: {
        validator: function(value) {
          return value <= Date.now(); // Order date must not be in the future
        },
        message: 'Order date cannot be in the future',
      },
    }, 
    totalAmount: { 
      type: Number, 
      required: true, 
      min: [0, 'Total amount must be a positive number'], // Total amount must be positive
    }, 
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Delivered"], 
      required: true,
    },
    qrId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "TableQr" 
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
