import express from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getAllCuisinesWithPrices,
  getMenuItems,
  updateMenuItem,
} from "../../controller/menuItem/menuItem.controller.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getMenuItems);
router.get("/menu", getAllCuisinesWithPrices);
router.post("/" , authenticateToken, createMenuItem);
router.put("/:id", authenticateToken, updateMenuItem);
router.delete("/:id", authenticateToken, deleteMenuItem);

export default router;
