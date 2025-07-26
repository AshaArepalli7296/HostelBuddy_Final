import Complaint from '../models/Complaint.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import cloudinary from '../config/cloudinary.js';

// 🧑‍🎓 STUDENT: Create Complaint
export const createComplaint = asyncHandler(async (req, res, next) => {
  console.log('💡 Incoming Complaint Request Body:', req.body);
  console.log('💡 Authenticated User:', req.user);
  console.log('💡 Uploaded File:', req.file);

  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  const { category, description } = req.body;

  if (!category || !description) {
    return next(new AppError('Category and description are required', 400));
  }

  let imageUrl = '';
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hostelBuddy/complaints',
    });
    imageUrl = result.secure_url;
  }

  const complaint = await Complaint.create({
    submittedBy: req.user._id,
    category,
    description,
    imageUrl,
    status: 'Pending'
  });

  res.status(201).json({
    status: 'success',
    message: 'Complaint submitted successfully',
    data: complaint
  });
});

// 🧑‍🎓 STUDENT: Get Own Complaints
export const getMyComplaints = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new AppError('Unauthorized: Missing user info', 401));
  }

  const complaints = await Complaint.find({ submittedBy: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: complaints.length,
    data: complaints
  });
});

// 🧑‍🔧 WARDEN: Get All Complaints
export const getAllComplaints = asyncHandler(async (req, res, next) => {
  // Optional: Enforce role check if needed
  if (!req.user || req.user.role !== 'warden') {
    return next(new AppError('Access denied: Warden only', 403));
  }

  const complaints = await Complaint.find()
    .populate({
      path: 'submittedBy',
      select: 'fullName room' // Ensures proper frontend display
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    data: complaints
  });
});

// 🧑‍🔧 WARDEN: Update Complaint Status
export const updateComplaintStatus = asyncHandler(async (req, res, next) => {
  const { status, assignedStaff, resolutionNotes } = req.body;

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    {
      status,
      assignedStaff,
      resolutionNotes
    },
    { new: true, runValidators: true }
  );

  if (!updatedComplaint) {
    return next(new AppError('Complaint not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Complaint updated successfully',
    data: updatedComplaint
  });
});
