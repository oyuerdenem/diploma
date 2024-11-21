import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  getOrdersWithBranch,
  updateOrder,
} from "../../controller/order/order.controller.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrdersWithBranch);
router.post("/", createOrder);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
