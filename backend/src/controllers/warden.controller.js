import AppError from '../utils/appError.js';
import User from '../models/User.model.js';
import Complaint from '../models/Complaint.model.js'; // Assuming you have these models
import Request from '../models/Request.model.js';

export const getWardenDashboard = async (req, res, next) => {
  try {
    // 1. Verify warden role
    if (req.user.role !== 'warden') {
      return next(new AppError('Access denied. Warden privileges required.', 403));
    }

    // 2. Get actual statistics
    const [totalStudents, pendingRequests, recentComplaints] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Request.countDocuments({ status: 'pending' }),
      Complaint.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title status createdAt')
        .lean()
    ]);

    // 3. Prepare response
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Warden Dashboard',
        warden: {
          id: req.user._id,
          name: req.user.fullName,
          email: req.user.email
        },
        stats: {
          totalStudents,
          pendingRequests,
          recentComplaints
        }
      }
    });

  } catch (err) {
    console.error('Warden Dashboard Error:', {
      error: err.message,
      stack: err.stack,
      user: req.user?._id
    });
    next(new AppError('Failed to load dashboard data', 500));
  }
};

// Additional useful warden functions
export const getStudentList = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('fullName email roomNumber')
      .lean();
    
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: { students }
    });
  } catch (err) {
    next(err);
  }
};



export const getAllComplaints = async (req, res, next) => {
  try {
    // Only wardens can access
    if (req.user.role !== 'warden') {
      return next(new AppError('Access denied. Warden privileges required.', 403));
    }

    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'fullName email roomNumber') // student info
      .lean();

    res.status(200).json({
      status: 'success',
      results: complaints.length,
      data: complaints
    });

  } catch (err) {
    console.error('Error fetching complaints:', err);
    next(new AppError('Failed to fetch complaints', 500));
  }
};


export default {
  getWardenDashboard,
  getStudentList,
    getAllComplaints
};