import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // leave, issue, etc.
  reason: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  dateSubmitted: { type: Date, default: Date.now }
});

export default mongoose.model('Request', requestSchema);
