import express from 'express';
import { createTable } from './table.controller.js';

const router = express.Router();

// Route to create a new table
router.post('/tables', createTable);

// Add more routes as necessary

export default router;
