const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String
    },
    message: {
      type: String,
      required: [true, 'Please provide a message']
    },
    status: {
      type: String,
      enum: ['new', 'processed'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema);
