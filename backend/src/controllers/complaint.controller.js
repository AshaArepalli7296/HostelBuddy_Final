import Complaint from '../models/Complaint.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';

/**
 * @desc    Create a new complaint
 * @route   POST /api/v1/students/complaints
 * @access  Protected (Student)
 */
export const createComplaint = asyncHandler(async (req, res, next) => {
  console.log('💡 Incoming Complaint Request Body:', req.body);
  console.log('💡 Authenticated User:', req.user);

  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  const { category, description, imageUrl } = req.body;

  if (!category || !description) {
    return next(new AppError('Category and description are required', 400));
  }

  const complaint = await Complaint.create({
    submittedBy: req.user._id,
    category,
    description,
    imageUrl: imageUrl || '', // fallback to empty string
    status: 'Pending'
  });

  console.log('✅ Complaint Created:', complaint);

  res.status(201).json({
    status: 'success',
    message: 'Complaint submitted successfully',
    data: complaint
  });
});

/**
 * @desc    Get all complaints submitted by logged-in student
 * @route   GET /api/v1/students/complaints
 * @access  Protected (Student)
 */
export const getMyComplaints = asyncHandler(async (req, res, next) => {
  console.log('📥 Fetching complaints for user:', req.user);

  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  const complaints = await Complaint.find({ submittedBy: req.user._id }).sort({ date: -1 });

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: complaints
  });
});
