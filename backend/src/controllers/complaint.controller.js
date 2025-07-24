import Complaint from '../models/Complaint.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import cloudinary from '../config/cloudinary.js'; // ✅ Correct path

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

  // ✅ Upload image to Cloudinary if present
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

  console.log('✅ Complaint Created:', complaint);

  res.status(201).json({
    status: 'success',
    message: 'Complaint submitted successfully',
    data: complaint
  });
});

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

export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find()
      .populate('submittedBy', 'fullName email roomNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({ status: 'success', data: complaints });
  } catch (err) {
    next(err);
  }
};


export const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo },
      { new: true }
    );
    res.status(200).json({ status: 'success', data: complaint });
  } catch (err) {
    next(err);
  }
};

