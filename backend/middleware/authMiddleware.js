const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_restaurant_portfolio_key_99812');

      // Get user from the token, exclude password
      req.user = await User.findById(decoded.id).select('-passwordHash');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found, authorization denied' });
      }

      if (req.user.status === 'suspended') {
        return res.status(403).json({ message: 'Your account has been suspended. Please contact support.' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an administrator' });
  }
};

module.exports = { protect, admin };
