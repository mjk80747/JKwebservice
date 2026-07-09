const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_restaurant_portfolio_key_99812', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, restaurantName } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Please provide name, email, password, and phone number' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Only jayakrishna@gmail.com can be admin, remaining all are normal users
    const role = email.toLowerCase() === 'jayakrishna@gmail.com' ? 'admin' : 'user';

    const user = await User.create({
      name,
      email,
      passwordHash: password, // hooks hash this pre-save
      phone,
      restaurantName,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        restaurantName: user.restaurantName,
        role: user.role,
        status: user.status,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate client/user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.status === 'suspended') {
        return res.status(403).json({ message: 'Your account has been suspended. Please contact support.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        restaurantName: user.restaurantName,
        role: user.role,
        status: user.status,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Authenticate Admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: client is not an administrator' });
      }

      if (user.status === 'suspended') {
        return res.status(403).json({ message: 'Your account has been suspended.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        restaurantName: user.restaurantName,
        role: user.role,
        status: user.status,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.restaurantName = req.body.restaurantName || user.restaurantName;

      if (req.body.password) {
        user.passwordHash = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        restaurantName: updatedUser.restaurantName,
        role: updatedUser.role,
        status: updatedUser.status,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
  getMe,
  updateProfile
};
