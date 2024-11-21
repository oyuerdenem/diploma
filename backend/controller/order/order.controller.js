import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import Order from "../../models/order/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Error on Get menu item:", error.message);
    res
      .status(404)
      .json({ success: false, error: "Failed to fetch menu item" });
  }
};

export const createOrder = async (req, res) => {
  const { totalAmount, qrId, option } = req.body;

  try {
    const lastOrder = await Order.findOne().sort({ orderId: -1 });
    const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const newOrder = new Order({
      orderId: newOrderId,
      totalAmount,
      status: "Pending",
      option,
      qrId,
    });

    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Error on Create menu item:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to create menu item" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Order ID" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error("Error on Update Order:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to update Order" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Order ID" });
  }

  try {
    await Order.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error on Delete Order:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete Order" });
  }
};
