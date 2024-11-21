import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import Order from "../../models/order/order.model.js";
import OrderItem from "../../models/orderItem/orderItem.model.js";
import TableQr from "../../models/tableqr/tableqr.model.js";

export const getOrderItems = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Order ID" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    const tableQr = await TableQr.findById(order.qrId);

    const orderItems = await OrderItem.find({ orderId: id });

    const orderItemsWithCuisine = await Promise.all(
      orderItems.map(async (orderItem) => {
        const cuisine = await Cuisine.findById(orderItem.cuisineId);
        return {
          ...orderItem.toObject(),
          cuisine: cuisine
            ? { name: cuisine.name, description: cuisine.description }
            : null,
        };
      })
    );

    res
      .status(200)
      .json({
        success: true,
        order,
        tableQr,
        orderItems: orderItemsWithCuisine,
      });
  } catch (error) {
    console.error("Error on Get order items:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch order items" });
  }
};

export const createOrderItem = async (req, res) => {
  const { orderId, cuisineId, quantity, itemPrice } = req.body;

  try {
    const cuisine = await Cuisine.findById(cuisineId);
    if (!cuisine) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid cuisineId" });
    }

    const lastOrderItem = await OrderItem.findOne().sort({ orderItemId: -1 });
    const newOrderItemId = lastOrderItem ? lastOrderItem.orderItemId + 1 : 1;

    const newOrderItem = new OrderItem({
      orderItemId: newOrderItemId,
      orderId,
      cuisineId,
      quantity,
      itemPrice,
    });

    await newOrderItem.save();
    res.status(201).json({ success: true, data: newOrderItem });
  } catch (error) {
    console.error("Error on Create menu item:", error.message);
    res
      .status(400)
      .json({ success: false, error: "Failed to create menu item" });
  }
};

// export const deleteOrderItem = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Invalid Order ID" });
//   }

//   try {
//     await OrderItem.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ success: true, message: "OrderItem deleted successfully" });
//   } catch (error) {
//     console.error("Error on Delete OrderItem:", error.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete OrderItem" });
//   }
// };
