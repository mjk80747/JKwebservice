const express = require('express');
const router = express.Router();
const {
  getMyInvoices,
  payInvoice,
  getFinancialMetrics,
  createInvoice
} = require('../controllers/invoiceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/my', protect, getMyInvoices);
router.post('/pay/:id', protect, payInvoice);

// Admin billing routes
router.get('/admin/financials', protect, admin, getFinancialMetrics);
router.post('/admin/invoices', protect, admin, createInvoice);

module.exports = router;
