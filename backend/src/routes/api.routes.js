import express from 'express';
import authRouter from './auth.routes.js';
import studentRouter from './student.routes.js';
import wardenRouter from './warden.routes.js';

const router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/students', studentRouter);
router.use('/api/v1/wardens', wardenRouter);


export default router;
