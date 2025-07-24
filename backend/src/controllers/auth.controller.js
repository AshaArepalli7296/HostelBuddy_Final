import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// JWT token helper
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: 'HostelBuddy'
  });
};

// ---------------- REGISTER ---------------- //
export const register = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      fieldId,
      contact,
      role,
      dob,
      address,
      imageUrl
    } = req.body;

    if (!fullName || !email || !password || !confirmPassword || !fieldId || !contact || !role)
      return next(new AppError('All fields are required', 400));

    if (password !== confirmPassword)
      return next(new AppError('Passwords do not match', 400));

    if (password.length < 8)
      return next(new AppError('Password must be at least 8 characters', 400));

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return next(new AppError('Please provide a valid email address', 400));

    const existingUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existingUser)
      return next(new AppError(`Email ${email} is already registered`, 400));

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      fieldId,
      contact,
      role,
      dob,
      address,
      imageUrl,
      isVerified: true
    });

    const token = signToken(newUser._id);
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      token,
      data: { user: newUser }
    });

  } catch (err) {
    if (err.code === 11000)
      return next(new AppError('Email already exists', 400));
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return next(new AppError(messages.join(', '), 400));
    }
    next(new AppError('Registration failed. Please try again.', 500));
  }
};

// ---------------- LOGIN ---------------- //
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return next(new AppError('Incorrect email or password', 401));

    const token = signToken(user._id);
    user.password = undefined;

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      data: { user }
    });

  } catch (err) {
    next(new AppError('Login failed. Please try again.', 500));
  }
};

// ---------------- GET PROFILE ---------------- //
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return next(new AppError('User not found', 404));

    res.status(200).json({
      status: 'success',
      user
    });
  } catch (err) {
    next(new AppError('Fetching profile failed', 500));
  }
};

// ---------------- UPDATE PROFILE ---------------- //
export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!updatedUser)
      return next(new AppError('User not found', 404));

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (err) {
    next(new AppError('Profile update failed', 500));
  }
};

// ---------------- SEND OTP ---------------- //
export const sendOtp = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    if (!identifier) return next(new AppError('Email or phone number is required', 400));

    const user = await User.findOne({
      $or: [{ email: identifier }, { contact: identifier }]
    });

    if (!user) return next(new AppError('User not found', 404));

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    if (user.email) {
      await sendEmail({
        to: user.email,
        subject: 'HostelBuddy - OTP for Password Reset',
        message: `Your OTP is: ${otp}. It will expire in 10 minutes.`
      });
    }

    res.status(200).json({ status: 'success', message: 'OTP sent to registered contact' });

  } catch (err) {
    next(new AppError('Failed to send OTP', 500));
  }
};

// ---------------- VERIFY OTP ---------------- //
export const verifyOtp = async (req, res, next) => {
  try {
    const { identifier, otp } = req.body;
    if (!identifier || !otp) return next(new AppError('Identifier and OTP are required', 400));

    const user = await User.findOne({
      $or: [{ email: identifier }, { contact: identifier }],
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user)
      return next(new AppError('Invalid or expired OTP', 400));

    res.status(200).json({ status: 'success', message: 'OTP verified' });

  } catch (err) {
    next(new AppError('OTP verification failed', 500));
  }
};

// ---------------- RESET PASSWORD ---------------- //
export const resetPassword = async (req, res, next) => {
  try {
    const { identifier, otp, newPassword, confirmPassword } = req.body;

    // Debugging log (optional)
    console.log("Reset Password Request Body:", req.body);

    if (!identifier || !otp || !newPassword || !confirmPassword)
      return next(new AppError('All fields are required', 400));

    if (newPassword !== confirmPassword)
      return next(new AppError('Passwords do not match', 400));

    const user = await User.findOne({
      $or: [{ email: identifier }, { contact: identifier }],
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user)
      return next(new AppError('Invalid or expired OTP', 400));

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully'
    });

  } catch (err) {
    console.error("Reset password error:", err);
    next(new AppError('Password reset failed', 500));
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

// ---------------- PROTECT (JWT Authentication) ---------------- //
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in!', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Authentication failed', 401));
  }
};
