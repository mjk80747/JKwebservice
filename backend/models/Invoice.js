const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inquiry',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Invoice amount is required']
    },
    description: {
      type: String,
      required: [true, 'Invoice description is required']
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid'
    },
    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
