import express from 'express';
import { register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  
  next();
}, register);

// router.post('/login', login);

export default router;