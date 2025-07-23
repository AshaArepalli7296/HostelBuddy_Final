import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Electrical', 'Plumbing', 'Furniture', 'Cleaning', 'Other'],
    required: [true, 'Complaint category is required']
  },
  description: {
    type: String,
    required: [true, 'Please provide a complaint description'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Complaint must be associated with a student']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
    }
  }
});

// 🔍 Text index for search functionality (by category or status)
complaintSchema.index({
  category: 'text',
  status: 'text',
  description: 'text'
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
