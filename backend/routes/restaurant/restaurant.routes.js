import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../../controller/restaurant/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
