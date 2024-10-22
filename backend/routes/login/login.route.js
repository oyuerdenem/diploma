// routes/auth.routes.js
import express from 'express';
import { loginStaff } from '../controller/auth.controller.js';

const router = express.Router();

// POST /api/login
router.post('/login', loginStaff);

export default router;
