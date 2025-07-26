import asyncHandler from '../utils/asyncHandler.js';
import Leave from '../models/Leave.model.js';
import User from '../models/User.model.js';
import sendEmail from '../services/email.service.js';

 
export const applyLeave = asyncHandler(async (req, res) => {
  const { startDate, endDate, reason, emergencyContact } = req.body;
  
// 1. Get student details from DB
  const student = await User.findById(req.user._id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Validate dates
  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: 'End date must be after start date' });
  }

  const leave = await Leave.create({
    student: student._id,
     studentName: student.fullName,
     roomNumber: student.roomNumber,
    startDate,
    endDate,
    reason,
    emergencyContact
  });

  // Populate student details for notification
  const populatedLeave = await Leave.findById(leave._id).populate('student', 'name email hostel roomNumber');

  // Notify warden (in real app, you'd query for the appropriate warden)
  await sendEmail({
    to: 'warden@hostel.edu', // Replace with actual warden email
    subject: 'New Leave Application',
    text: `A new leave application has been submitted by ${populatedLeave.student.name} (Room ${populatedLeave.student.roomNumber}).`
  });

  res.status(201).json(populatedLeave);
});

 
export const getLeaveHistory = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ student: req.user._id })
    .sort({ appliedOn: -1 })
    .lean();
  
  res.json(leaves);
});

 
export const getPendingLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({ status: 'pending' })
    .populate('student', 'name email hostel roomNumber')
    .sort({ appliedOn: 1 })
    .lean();
  
  res.json(leaves);
});

 
export const updateLeaveStatus = asyncHandler(async (req, res) => {
  const { status, comment } = req.body;
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const leave = await Leave.findById(req.params.id).populate('student', 'name email');
  
  if (!leave) {
    return res.status(404).json({ message: 'Leave not found' });
  }

  leave.status = status;
  leave.wardenComment = comment || '';
  leave.updatedAt = new Date();
  
  await leave.save();

  // Notify student
  await sendEmail({
    to: leave.student.email,
    subject: `Leave Application ${status}`,
    text: `Your leave application from ${leave.startDate} to ${leave.endDate} has been ${status}. ${comment ? `Warden's comment: ${comment}` : ''}`
  });

  res.json(leave);
});

 
export const getLeaveStats = asyncHandler(async (req, res) => {
  const [pending, approved, rejected] = await Promise.all([
    Leave.countDocuments({ status: 'pending' }),
    Leave.countDocuments({ status: 'approved' }),
    Leave.countDocuments({ status: 'rejected' })
  ]);

  res.json({ pending, approved, rejected });
});

// DELETE /api/v1/leave/:id
 export const deleteLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);

  if (!leave) {
    return res.status(404).json({ message: 'Leave not found' });
  }

  if (leave.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this leave' });
  }

  await leave.deleteOne();

  res.status(200).json({ message: 'Leave deleted successfully' });
});

