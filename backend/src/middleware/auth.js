import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import AppError from '../utils/appError.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(new AppError('Unauthorized: No token provided', 401));
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return next(new AppError('User not found', 404));

    req.user = user; // Attach user info to request object
    next();
  } catch (err) {
    next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};
