const Invoice = require('../models/Invoice');
const Inquiry = require('../models/Inquiry');

// @desc    Get current user's invoices
// @route   GET /api/invoices/my
// @access  Private
const getMyInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id })
      .populate('inquiryId', 'restaurantName')
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving invoices' });
  }
};

// @desc    Simulate or pay an invoice
// @route   POST /api/invoices/pay/:id
// @access  Private
const payInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Verify authorized user: owner of invoice or admin
    if (invoice.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to make payments for this invoice' });
    }

    invoice.status = 'paid';
    const updatedInvoice = await invoice.save();
    
    // Automatically progress project lead stage if won/retainer paid
    const inquiry = await Inquiry.findById(invoice.inquiryId);
    if (inquiry && inquiry.status === 'pending') {
      inquiry.status = 'closed_won';
      inquiry.developmentStage = 'Design Phase'; // Begin design phase on deposit payment
      await inquiry.save();
    }

    res.json(updatedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error processing payment simulator' });
  }
};

// @desc    Get aggregate financial metrics
// @route   GET /api/admin/financials
// @access  Private/Admin
const getFinancialMetrics = async (req, res) => {
  try {
    const paidInvoices = await Invoice.find({ status: 'paid' });
    const unpaidInvoices = await Invoice.find({ status: 'unpaid' });

    const totalRevenue = paidInvoices.reduce((acc, current) => acc + current.amount, 0);
    const pendingPipeline = unpaidInvoices.reduce((acc, current) => acc + current.amount, 0);

    // Let's compute Monthly Recurring Revenue (MRR) - simulated as the sum of monthly service retainers
    // For our startup model, we'll calculate MRR as 10% of total revenue as support subscriptions
    const calculatedMRR = Math.round(totalRevenue * 0.15);

    res.json({
      totalRevenue,
      pendingPipeline,
      mrr: calculatedMRR,
      totalPaidInvoicesCount: paidInvoices.length,
      totalUnpaidInvoicesCount: unpaidInvoices.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error calculating financials' });
  }
};

// @desc    Admin create custom invoice for a client project
// @route   POST /api/admin/invoices
// @access  Private/Admin
const createInvoice = async (req, res) => {
  try {
    const { inquiryId, amount, description } = req.body;

    if (!inquiryId || !amount || !description) {
      return res.status(400).json({ message: 'Inquiry ID, amount, and description are required' });
    }

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: 'Linked inquiry workspace not found' });
    }

    const invoice = new Invoice({
      inquiryId,
      userId: inquiry.userId,
      amount,
      description,
      status: 'unpaid',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // Due in 14 days
    });

    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating invoice' });
  }
};

module.exports = {
  getMyInvoices,
  payInvoice,
  getFinancialMetrics,
  createInvoice
};
