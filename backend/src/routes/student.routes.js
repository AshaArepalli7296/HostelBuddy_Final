import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import { createComplaint, getMyComplaints } from '../controllers/complaint.controller.js';
import upload from '../middleware/uploadImage.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('student'));

router.post('/complaints', upload.single('photo'), createComplaint);
router.get('/complaints', getMyComplaints);

export default router;
