const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginAdmin,
  getMe,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
