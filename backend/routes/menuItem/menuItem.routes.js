import express from "express";
import {
  createMenuItem,
  deleteMenuItem,
  getAllCuisinesWithPrices,
  getMenuItems,
  updateMenuItem,
} from "../../controller/menuItem/menuItem.controller.js";

const router = express.Router();

router.get("/", getMenuItems);
router.get("/menu", getAllCuisinesWithPrices);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;
