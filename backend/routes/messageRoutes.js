const express = require('express');
const router = express.Router();
const { getMessages, createMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createMessage);

router.route('/:inquiryId')
  .get(protect, getMessages);

module.exports = router;
