// src/routes/student.routes.js
import express from 'express';
import authController from '../controllers/auth.controller.js';
import studentController from '../controllers/student.controller.js';
import complaintController from '../controllers/complaint.controller.js'; // ✅ Import complaints controller

const router = express.Router();

// 🔐 Apply student-only protection
router.use(authController.protect, authController.restrictTo('student'));

// 🎓 Student dashboard route
router.get('/dashboard', studentController.getStudentDashboard);

// 📮 Complaint routes for students
router.get('/complaints', complaintController.getMyComplaints);     // Get own complaints
router.post('/complaints', complaintController.createComplaint);    // Submit a complaint

export default router;
