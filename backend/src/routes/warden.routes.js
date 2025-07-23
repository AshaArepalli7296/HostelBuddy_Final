// src/routes/warden.routes.js
import express from 'express';
import * as authController from '../controllers/auth.controller.js'; // ✅ Correct for named exports

import wardenController from '../controllers/warden.controller.js';

const router = express.Router();

// Protect all routes and restrict to 'warden' role
router.use(authController.protect, authController.restrictTo('warden'));

// Warden Dashboard
router.get('/warden-dashboard', wardenController.getWardenDashboard);

export default router;