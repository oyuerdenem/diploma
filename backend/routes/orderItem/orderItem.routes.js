import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import {
  createOrderItem,
  getOrderItems,
} from "../../controller/orderItem/orderItem.controller.js";

const router = express.Router();

router.get("/:id", authenticateToken, getOrderItems);
router.post("/", createOrderItem);

export default router;
