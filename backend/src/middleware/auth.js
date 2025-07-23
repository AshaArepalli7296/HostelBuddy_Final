// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import AppError from '../utils/appError.js';

/**
 * Middleware to protect routes and attach user to request object
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Unauthorized: No token provided', 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) return next(new AppError('User not found', 404));

    // Attach essential user info to request
    req.user = {
      _id: user._id,
      role: user.role,
      name: user.fullName || user.name, // Support both fullName or name
      email: user.email
    };

    console.log('🔐 Authenticated User:', req.user);

    next();
  } catch (err) {
    console.error('❌ Auth Error:', err.message);
    next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};

/**
 * Middleware to restrict routes to specific roles (e.g. 'student', 'warden')
 */
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden: Access denied', 403));
    }

    next();
  };
};
