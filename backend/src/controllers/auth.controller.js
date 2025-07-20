import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from '../utils/appError.js';

// Helper function to sign JWT tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: 'HostelBuddy'
  });
};

// Enhanced Registration Controller
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword, role = 'student' } = req.body;

    // 1. Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      return next(new AppError('All fields are required', 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError('Passwords do not match', 400));
    }

    if (password.length < 8) {
      return next(new AppError('Password must be at least 8 characters', 400));
    }

    // 2. Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return next(new AppError('Please provide a valid email address', 400));
    }

    // 3. Check for existing user (case insensitive)
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (existingUser) {
      return next(new AppError(`Email ${email} is already registered`, 400));
    }

    // 4. Enforce role limits
    if (role === 'student') {
      const studentCount = await User.countDocuments({ role: 'student' });
      if (studentCount >= 1000) {
        const existing = await User.findOne({ role: 'student' });
        return next(new AppError(
          `Student account (${existing.email}) already exists. ` +
          'Only one student account is allowed.',
          400
        ));
      }
    }

    if (role === 'warden') {
      const wardenCount = await User.countDocuments({ role: 'warden' });
      if (wardenCount >= 100) {
        const existing = await User.findOne({ role: 'warden' });
        return next(new AppError(
          `Warden account (${existing.email}) already exists. ` +
          'Only one warden account is allowed.',
          400
        ));
      }
    }
//     if (role === 'admin') {
//   // Optional: Still restrict admin registrations if needed
//   const adminCount = await User.countDocuments({ role: 'admin' });
//   if (adminCount >= 1) {
//     return next(new AppError('Admin registration is restricted', 400));
//   }
// }

    // 5. Create new user
    const newUser = await User.create({
  fullName,
  email: email.toLowerCase(),
  password,
  role,
  isVerified: true // optional override
});


    // 6. Generate token
    const token = signToken(newUser._id);
    newUser.password = undefined;

    // 7. Send response
    res.status(201).json({
      status: 'success',
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      token,
      data: {
        user: newUser
      }
    });

  } catch (err) {
    // Handle specific MongoDB errors
    if (err.code === 11000) {
      return next(new AppError('Email already exists (database constraint)', 400));
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(messages.join(', '), 400));
    }
    
    console.error('Registration Error:', {
      message: err.message,
      stack: err.stack,
      body: req.body
    });
    next(new AppError('Registration failed. Please try again.', 500));
  }
};

// Enhanced Login Controller
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 2. Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3. If everything ok, send token to client
    const token = signToken(user._id);
    user.password = undefined;
    
res.status(200).json({
  token,
  user: {
    id: user._id,
    role: user.role,
    email: user.email,
    fullName: user.fullName
  }
});


  } catch (err) {
    console.error('Login Error:', {
      email: req.body.email,
      error: err.message
    });
    next(new AppError('Login failed. Please try again.', 500));
  }
};

// Authentication Middleware
export const protect = async (req, res, next) => {
  try {
    // 1. Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // 4. Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Authorization Middleware
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// Export all functions
export default {
  register,
  login,
  protect,
  restrictTo
};