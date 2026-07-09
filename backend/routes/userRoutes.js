const express = require('express');
const router = express.Router();
const { getUsers, updateUserStatus, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id/status')
  .put(protect, admin, updateUserStatus);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;
