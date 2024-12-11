import mongoose from "mongoose";
import Cuisine from "../../models/cuisine/cuisine.model.js";
import Order from "../../models/order/order.model.js";
import Branch from "../../models/branch/branch.model.js";

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

export const getOrdersWithBranch = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the branch ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Branch ID" });
    }

    // Query orders for the specific branch
    const orders = await Order.find({ branchId: id });

    // Check if orders exist for the branch
    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this branch" });
    }

    // Respond with the orders
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch orders" });
  }
};

export const getOrdersWithTable = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the branch ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Branch ID" });
    }

    // Use aggregation to group orders by tableNumber
    // const orders = await Order.aggregate([
    //   { $match: { branchId: mongoose.Types.ObjectId(id) } }, // Match orders with the given branchId
    //   {
    //     $lookup: {
    //       from: "tableqrs", // Collection name of TableQr in MongoDB
    //       localField: "qrId",
    //       foreignField: "_id",
    //       as: "tableDetails",
    //     },
    //   },
    //   { $unwind: "$tableDetails" }, // Flatten the tableDetails array
    //   {
    //     $group: {
    //       _id: "$tableDetails.tableNumber", // Group by tableNumber
    //       orders: { $push: "$$ROOT" }, // Include all order details in each group
    //     },
    //   },
    //   { $project: { _id: 0, tableNumber: "$_id", orders: 1 } }, // Format the result
    // ]);
    // const orders = await Order.aggregate([
    //   { $match: { branchId: id } }, // Match orders with the given branchId
    //   // { 
    //   //   $group: { 
    //   //     _id: "$qrId", // Group by the `status` field (replace this with your desired field)
    //   //     totalOrders: { $sum: 1 }, // Count total orders in each group
    //   //     orders: { $push: "$$ROOT" } // Include all orders in the group
    //   //   }
    //   // }
    // ]);

    const orders = await Order.find({ branchId: id });
    
    console.log(orders);
    

    // Check if any orders exist
    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this branch" });
    }

    // Respond with the grouped orders
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
};



export const createOrder = async (req, res) => {
  const { totalAmount, qrId, option, branchId } = req.body;

  try {
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res
        .status(404)
        .json({ success: false, message: "Branch not found" });
    }
    const lastOrder = await Order.findOne().sort({ orderId: -1 });
    const newOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const newOrder = new Order({
      branchId: branchId,
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
