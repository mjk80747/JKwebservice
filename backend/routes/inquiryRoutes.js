const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getMyInquiries,
  getInquiryById,
  updateInquiryAssets,
  getAllInquiries,
  updateInquiryStage,
  updateInquiryStatus
} = require('../controllers/inquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createInquiry)
  .get(protect, admin, getAllInquiries);

router.get('/my', protect, getMyInquiries);

router.route('/:id')
  .get(protect, getInquiryById);

router.put('/:id/assets', protect, updateInquiryAssets);
router.put('/:id/stage', protect, admin, updateInquiryStage);
router.put('/:id/status', protect, admin, updateInquiryStatus);

module.exports = router;
