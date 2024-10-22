// routes/user.routes.js
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { addUser, getUserById, getUsers } from '../controller/user.controller.js';

const router = express.Router();

// Route to add a user (only admins can add)
// router.post('/', authenticateToken, (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access forbidden: Admins only' });
//   }
//   next();
// }, addUser);
router.post('/', authenticateToken, addUser);

// Route to get all users
router.get('/', authenticateToken, getUsers);

// Route to get a user by ID
router.get('/:id', authenticateToken, getUserById);

export default router;
