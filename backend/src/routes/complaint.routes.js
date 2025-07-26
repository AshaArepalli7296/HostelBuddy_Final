// routes/complaint.routes.js
import express from 'express';
import {
  createComplaint,
  getMyComplaints
} from '../controllers/complaint.controller.js';
import authController from '../controllers/auth.controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// 🛡️ Protect all routes
router.use(authController.protect);

// 📌 Student creates a complaint
router.post('/', upload.single('image'), createComplaint);

// 📌 Student fetches their own complaints
router.get('/my-complaints', getMyComplaints);

export default router;
