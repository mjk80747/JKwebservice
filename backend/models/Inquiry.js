const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    restaurantName: {
      type: String,
      required: [true, 'Please provide the restaurant name'],
      trim: true
    },
    selectedFeatures: [
      {
        type: String
      }
    ],
    estimatedPrice: {
      type: Number,
      default: 0
    },
    message: {
      type: String
    },
    developmentStage: {
      type: String,
      enum: ['Briefing', 'Design Phase', 'Development', 'QA & Review', 'Launched'],
      default: 'Briefing'
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'in_discussion', 'closed_won', 'closed_lost'],
      default: 'pending'
    },
    uploadedAssets: {
      logoUrl: {
        type: String,
        default: ''
      },
      menuUrl: {
        type: String,
        default: ''
      },
      specialInstructions: {
        type: String,
        default: ''
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
