import Complaint from '../models/Complaint.model.js';
import AppError from '../utils/appError.js';

// ---------------- CREATE COMPLAINT ---------------- //
export const createComplaint = async (req, res, next) => {
  try {
    const { category, description, imageUrl } = req.body;

    if (!category || !description) {
      return next(new AppError('Complaint type and description are required', 400));
    }

    const complaint = await Complaint.create({
      student: req.user._id,
      studentName: req.user.fullName,
      room: req.user.room || req.user.fieldId, // adjust based on User model
      category,
      description,
      imageUrl: imageUrl || '',
      status: 'pending',
      date: new Date()
    });

    res.status(201).json({
      status: 'success',
      message: 'Complaint submitted',
      data: complaint
    });
  } catch (err) {
    next(new AppError('Failed to submit complaint', 500));
  }
};

// ---------------- GET COMPLAINTS ---------------- //
export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json({
      status: 'success',
      results: complaints.length,
      data: complaints
    });
  } catch (err) {
    next(new AppError('Failed to fetch complaints', 500));
  }
};

// ---------------- GET STUDENT'S OWN COMPLAINTS ---------------- //
export const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id }).sort({ date: -1 });
    res.status(200).json({
      status: 'success',
      results: complaints.length,
      data: complaints
    });
  } catch (err) {
    next(new AppError('Failed to fetch your complaints', 500));
  }
};

// ---------------- UPDATE COMPLAINT STATUS ---------------- //
export const updateComplaint = async (req, res, next) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return next(new AppError('Complaint not found', 404));

    res.status(200).json({
      status: 'success',
      message: 'Complaint updated',
      data: updated
    });
  } catch (err) {
    next(new AppError('Failed to update complaint', 500));
  }
};

// ---------------- DELETE COMPLAINT (optional) ---------------- //
export const deleteComplaint = async (req, res, next) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new AppError('Complaint not found', 404));

    res.status(204).json({ status: 'success', message: 'Complaint deleted' });
  } catch (err) {
    next(new AppError('Failed to delete complaint', 500));
  }
};
