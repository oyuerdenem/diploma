import express from "express";
import {
  createCuisineType,
  deleteCuisineType,
  getCuisineTypes,
  updateCuisineType,
} from "../../controller/cuisineType/cuisineType.controller.js";

const router = express.Router();

router.get("/", getCuisineTypes);
router.post("/", createCuisineType);
router.put("/:id", updateCuisineType);
router.delete("/:id", deleteCuisineType);

export default router;
