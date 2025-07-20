// src/routes/student.routes.js
import express from 'express';
import authController from '../controllers/auth.controller.js';
import studentController from '../controllers/student.controller.js';

const router = express.Router();

// Use the imported authController
router.use(authController.protect, authController.restrictTo('student'));

router.get('/dashboard', studentController.getStudentDashboard);

export default router;