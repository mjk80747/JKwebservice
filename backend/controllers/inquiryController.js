const Inquiry = require('../models/Inquiry');
const Project = require('../models/Project');
const Invoice = require('../models/Invoice');

// @desc    Create a new project inquiry (starts client workspace)
// @route   POST /api/inquiries
// @access  Private
const createInquiry = async (req, res) => {
  try {
    const { projectId, restaurantName, selectedFeatures, message } = req.body;

    if (!projectId || !restaurantName) {
      return res.status(400).json({ message: 'Project ID and Restaurant Name are required' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project showcase not found' });
    }

    // Calculate dynamic pricing estimate: Base price ($800) + custom add-ons
    let basePrice = 800;
    if (selectedFeatures && Array.isArray(selectedFeatures)) {
      selectedFeatures.forEach((feature) => {
        if (feature === 'table-booking') basePrice += 250;
        if (feature === 'pos-integration') basePrice += 400;
        if (feature === 'admin-analytics') basePrice += 300;
        if (feature === 'multi-language') basePrice += 150;
        if (feature === 'qr-code-menu') basePrice += 100;
      });
    }

    const inquiry = new Inquiry({
      userId: req.user._id,
      projectId,
      restaurantName,
      selectedFeatures: selectedFeatures || [],
      estimatedPrice: basePrice,
      message,
      developmentStage: 'Briefing',
      status: 'pending'
    });

    const savedInquiry = await inquiry.save();

    // Increment Project Leads count
    project.leadsGenerated = (project.leadsGenerated || 0) + 1;
    await project.save();

    // Startup billing monetization logic:
    // Create an initial invoice representing 50% retainer fee
    const invoiceAmount = Math.round(basePrice * 0.5);
    const invoice = new Invoice({
      inquiryId: savedInquiry._id,
      userId: req.user._id,
      amount: invoiceAmount,
      description: `50% Retainer Fee - Custom Build based on ${project.title}`,
      status: 'unpaid',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 7 days
    });
    await invoice.save();

    res.status(201).json({
      inquiry: savedInquiry,
      invoice: invoice
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error processing inquiry' });
  }
};

// @desc    Get logged in user's inquiries
// @route   GET /api/inquiries/my
// @access  Private
const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user._id })
      .populate('projectId', 'title category previewImages')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving your inquiries' });
  }
};

// @desc    Get inquiry by ID (client who owns it or admin)
// @route   GET /api/inquiries/:id
// @access  Private
const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('userId', 'name email phone restaurantName')
      .populate('projectId', 'title category techStack previewImages demoLink');

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry workspace not found' });
    }

    // Authorization: User must own the inquiry or be admin
    if (inquiry.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to access this workspace' });
    }

    res.json(inquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving inquiry details' });
  }
};

// @desc    Client upload/update logo and menu references
// @route   PUT /api/inquiries/:id/assets
// @access  Private
const updateInquiryAssets = async (req, res) => {
  try {
    const { logoUrl, menuUrl, specialInstructions } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry workspace not found' });
    }

    // Check ownership
    if (inquiry.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this workspace' });
    }

    inquiry.uploadedAssets = {
      logoUrl: logoUrl || inquiry.uploadedAssets.logoUrl,
      menuUrl: menuUrl || inquiry.uploadedAssets.menuUrl,
      specialInstructions: specialInstructions || inquiry.uploadedAssets.specialInstructions
    };

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving asset files' });
  }
};

// @desc    Get all inquiries (leads)
// @route   GET /api/inquiries
// @access  Private/Admin
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({})
      .populate('userId', 'name email phone restaurantName')
      .populate('projectId', 'title category')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving admin leads list' });
  }
};

// @desc    Update project development phase
// @route   PUT /api/inquiries/:id/stage
// @access  Private/Admin
const updateInquiryStage = async (req, res) => {
  try {
    const { developmentStage } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry workspace not found' });
    }

    if (developmentStage) {
      inquiry.developmentStage = developmentStage;
      const updatedInquiry = await inquiry.save();
      return res.json(updatedInquiry);
    } else {
      return res.status(400).json({ message: 'Please provide development stage' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating stage' });
  }
};

// @desc    Update lead CRM inquiry status
// @route   PUT /api/inquiries/:id/status
// @access  Private/Admin
const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    if (status) {
      inquiry.status = status;
      const updatedInquiry = await inquiry.save();
      return res.json(updatedInquiry);
    } else {
      return res.status(400).json({ message: 'Please provide status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating status' });
  }
};

module.exports = {
  createInquiry,
  getMyInquiries,
  getInquiryById,
  updateInquiryAssets,
  getAllInquiries,
  updateInquiryStage,
  updateInquiryStatus
};
