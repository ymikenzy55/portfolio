import express from 'express';
import { register, login, getMe, logout, createAdmin, getAdmins } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);
router.post('/create-admin', protect, authorize('admin'), createAdmin);
router.get('/admins', protect, authorize('admin'), getAdmins);

export default router;
