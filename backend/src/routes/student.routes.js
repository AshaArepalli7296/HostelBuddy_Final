import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as studentController from '../controllers/student.controller.js';
import * as complaintController from '../controllers/complaint.controller.js';

const router = express.Router();

// ⛔ Protect all student routes and restrict to 'student' role
router.use(authController.protect, authController.restrictTo('student'));

// 🎓 Student Dashboard
router.get('/student-dashboard', studentController.getStudentDashboard);

// 📮 Complaint Routes
router.get('/complaints', complaintController.getMyComplaints);
router.post('/complaints', complaintController.createComplaint);

export default router;
