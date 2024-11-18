import express from "express";
import { authenticateToken } from "../../middlewares/authMiddleware.js";
import {
  addUser,
  getUserById,
  getUsers,
} from "../../controller/user/user.controller.js";
import checkAdminRole from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, checkAdminRole, addUser);
router.get("/", authenticateToken, checkAdminRole, getUsers);
router.get("/:id", authenticateToken, getUserById);

export default router;
