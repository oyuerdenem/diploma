import express from "express";
import {
  getStaffs,
  createStaff,
  loginStaff,
} from "../controller/staff.controller.js";
import { authenticateToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();
const checkAdminRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  next();
};

router.get("/", getStaffs);
router.post("/", checkAdminRole, createStaff);
// router.get("/:id", getStaffById);
// router.put("/:id", updateStaff);
// router.delete("/:id", deleteStaff);

router.post("/login", authenticateToken, loginStaff);

export default router;
