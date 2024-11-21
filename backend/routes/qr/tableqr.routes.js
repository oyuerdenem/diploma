import express from "express";
import { getTableQrById, getTableQrs } from "../../controller/tableqr/tableqr.controller.js";

const router = express.Router();

router.get("/", getTableQrs);
router.get("/:id", getTableQrById);

export default router;
