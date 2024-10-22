import express from "express";
import {
  getCuisines,
  createCuisine,
  updateCuisine,
} from "../../controller/cuisine/cuisine.controller.js";

const router = express.Router();

router.get("/", getCuisines);
router.post("/", createCuisine);
router.put("/:id", updateCuisine);

export default router;
