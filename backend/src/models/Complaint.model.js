// Complaint.model.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  room: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Internet']
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  assignedStaff: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    default: '' // Optional image upload for complaint
  }
}, {
  timestamps: true
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
