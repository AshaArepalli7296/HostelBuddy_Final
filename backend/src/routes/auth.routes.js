import express from 'express';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  resetPassword
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// OTP-based Password Reset
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
