import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import { createComplaint, getMyComplaints } from '../controllers/complaint.controller.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

router.use(protect); // ✅ Set req.user
router.use(restrictTo('student')); // ✅ Only allow students

// Complaint submission with image upload
router.post('/complaints', upload.single('photo'), createComplaint);

// Get student’s own complaints
router.get('/complaints', getMyComplaints);

export default router;
