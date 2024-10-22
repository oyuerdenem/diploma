import express from "express";
import {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../controller/branch/branch.controller.js";

const router = express.Router();

router.get("/", getBranches);
router.get("/:id", getBranchById);
router.post("/", createBranch);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;
