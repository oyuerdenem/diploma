import express from "express";
import {
  createTable,
  getTables,
} from "../../controller/table/table.controller.js";

const router = express.Router();

// Route to create a new table
router.post("/", createTable);
router.get("/", getTables);

// Add more routes as necessary

export default router;
