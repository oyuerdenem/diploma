import express from "express";
import { loginUser } from "../../controller/auth/auth.controller.js";

const router = express.Router();

router.post("/", loginUser);

export default router;
