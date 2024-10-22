import express from "express";
import {
  getCuisines,
  createCuisine,
  updateCuisine,
  // deleteCuisine,
} from "../controller/cuisine.controller.js";

const router = express.Router();

router.get("/", getCuisines);
router.post("/", createCuisine);
router.put("/:id", updateCuisine);
// router.delete("/:id", deleteCuisine);

export default router;
