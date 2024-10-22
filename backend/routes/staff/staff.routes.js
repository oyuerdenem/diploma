import express from "express";
import {
  getStaffs,
  createStaff,
} from "../../controller/staff/staff.controller.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import checkAdminRole from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getStaffs);
router.post("/", authenticateToken, checkAdminRole, createStaff);

// router.post("/login", authenticateToken, loginStaff);

export default router;
