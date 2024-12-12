import express from "express";
import {
  createOrder,
  deleteOrder,
  getCompletedOrders,
  getOrders,
  getOrdersWithBranch,
  getUncompletedOrders,
  updateOrder,
} from "../../controller/order/order.controller.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getOrders);
router.get("/:id", authenticateToken, getOrdersWithBranch);
router.get("/completed/:id", authenticateToken, getCompletedOrders);
router.get("/uncompleted/:id", authenticateToken, getUncompletedOrders);
router.post("/", createOrder);
router.put("/:id", authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
