import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'warden'],
    required: true,
    immutable: true // Prevents role changes after creation
  },
  // Student-specific fields
  rollNumber: { 
    type: String,
    required: function() { return this.role === 'student'; }
  },
  roomAllocated: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  // Warden-specific fields
  staffId: {
    type: String,
    required: function() { return this.role === 'warden'; }
  },
  hostelAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' }
}, { 
  timestamps: true,
  discriminatorKey: 'role' // Enables separate querying
});

// Create discriminators for separate collections
const User = mongoose.model('User', userSchema);

const Student = User.discriminator('student', new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  roomAllocated: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  department: { type: String, required: true }
}));

const Warden = User.discriminator('warden', new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  hostelAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' },
  isAdmin: { type: Boolean, default: false }
}));

export { User, Student, Warden };