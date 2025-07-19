import { Student, Warden } from '../models/User.model.js';

export const register = async (req, res) => {
  const { fullName, email, password, role, ...roleSpecificData } = req.body;

  try {
    // Common validation
    if (role === 'student' && !roleSpecificData.rollNumber) {
      return res.status(400).json({ error: "Roll number required for students" });
    }
    if (role === 'warden' && !roleSpecificData.staffId) {
      return res.status(400).json({ error: "Staff ID required for wardens" });
    }

    // Create user based on role
    let user;
    if (role === 'student') {
      user = await Student.create({
        fullName,
        email,
        password,
        ...roleSpecificData
      });
    } else {
      user = await Warden.create({
        fullName,
        email,
        password,
        ...roleSpecificData
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      ...(role === 'student' && { rollNumber: user.rollNumber }),
      ...(role === 'warden' && { staffId: user.staffId }),
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};