// src/controllers/student.controller.js
export const getStudentDashboard = async (req, res) => {
  try {
    // Your dashboard logic here
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Welcome to Student Dashboard'
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Make sure to export all your controller functions
export default {
  getStudentDashboard
  // Add other functions here as needed
};