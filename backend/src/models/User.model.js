import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email format"
    }
  },
  fieldId: {
    type: String,
    required: [true, 'Please provide your field ID (e.g., Roll No / Warden ID)'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Please provide a contact number'],
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: 'Contact number must be 10 digits'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'warden'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,

  // 👇 OTP for Forgot Password
  otp: String,
  otpExpires: Date

}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(new Error('Password hashing failed'));
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

// Add text index for search functionality
userSchema.index({
  fullName: 'text',
  email: 'text'
});

const User = mongoose.model('User', userSchema);
export default User;
