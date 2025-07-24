import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import wardenController from '../controllers/warden.controller.js';
import {
  getAllComplaints,
  updateComplaintStatus
} from '../controllers/complaint.controller.js';

const router = express.Router();

// Protect all routes and restrict to 'warden' role
router.use(authController.protect, authController.restrictTo('warden'));

// Warden Dashboard
router.get('/warden-dashboard', wardenController.getWardenDashboard);

// Complaint management
router.get('/complaints', getAllComplaints); // Fetch all complaints
router.patch('/complaints/:id', updateComplaintStatus); // Update status/assignment

export default router;
