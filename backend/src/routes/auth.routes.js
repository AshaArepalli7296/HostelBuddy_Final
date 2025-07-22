import express from 'express';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateProfile // 👈 Add this
} from '../controllers/auth.controller.js';

import { protect } from '../middleware/auth.js'; // ✅ Verify token before allowing profile edits

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// OTP-based Password Reset
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// ✅ New Profile Update Route
router.put('/users/:id', protect, updateProfile);

export default router;
