const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a description']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Fine Dining', 'Café', 'Cloud Kitchen', 'Sushi Lounge', 'Bakery', 'Portfolio']
    },
    techStack: [
      {
        type: String
      }
    ],
    featuresList: [
      {
        type: String
      }
    ],
    previewImages: [
      {
        type: String
      }
    ],
    demoLink: {
      type: String,
      required: [true, 'Please provide a live demo URL']
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    leadsGenerated: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);
