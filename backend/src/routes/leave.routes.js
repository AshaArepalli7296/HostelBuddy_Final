import express from 'express';
import {
  applyLeave,
  getLeaveHistory,
  getPendingLeaves,
  updateLeaveStatus,
  getLeaveStats,
  deleteLeave
} from '../controllers/leave.controller.js';

import { protect, restrictTo } from '../middleware/auth.js';
 
 const router = express.Router();

// Student routes
router.post('/apply', protect, restrictTo('student'), applyLeave);
router.get('/history', protect, restrictTo('student'), getLeaveHistory);
router.delete('/:id', protect,restrictTo('student'), deleteLeave);

// Warden routes
router.get('/pending', protect, restrictTo('warden'), getPendingLeaves);
router.put('/:id/status', protect, restrictTo('warden'), updateLeaveStatus);
router.get('/stats', protect, restrictTo('warden'), getLeaveStats);
 

export default router;