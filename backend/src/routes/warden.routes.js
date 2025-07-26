import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import wardenController from '../controllers/warden.controller.js';
import {
  getAllComplaints,
  updateComplaintStatus
} from '../controllers/complaint.controller.js';

const router = express.Router();

// 🔐 Apply protection and role restriction to all warden routes
router.use(authController.protect);
router.use(authController.restrictTo('warden'));

// 🧭 Warden Dashboard Endpoint
router.get('/warden-dashboard', wardenController.getWardenDashboard);

// 🛠️ Complaint Management Routes
router.get('/complaints', getAllComplaints); // Fetch all complaints
router.patch('/complaints/:id', updateComplaintStatus); // Update status or assign staff

export default router;
