const Message = require('../models/Message');
const Inquiry = require('../models/Inquiry');

// @desc    Get all messages for an inquiry workspace
// @route   GET /api/messages/:inquiryId
// @access  Private
const getMessages = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry workspace not found' });
    }

    // Verify authorized user: owner of inquiry or admin
    if (inquiry.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view messages in this workspace' });
    }

    const messages = await Message.find({ inquiryId: req.params.inquiryId })
      .populate('senderId', 'name email role')
      .sort({ createdAt: 1 }); // Chronological order

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving messages' });
  }
};

// @desc    Post a new message in the workspace
// @route   POST /api/messages
// @access  Private
const createMessage = async (req, res) => {
  try {
    const { inquiryId, message } = req.body;

    if (!inquiryId || !message) {
      return res.status(400).json({ message: 'Inquiry ID and message text are required' });
    }

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry workspace not found' });
    }

    // Verify authorized sender: owner of inquiry or admin
    if (inquiry.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to send messages in this workspace' });
    }

    const newMessage = new Message({
      inquiryId,
      senderId: req.user._id,
      message
    });

    const savedMessage = await newMessage.save();
    
    // Populate sender details for immediate frontend updates
    const populated = await Message.findById(savedMessage._id).populate('senderId', 'name email role');

    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

module.exports = {
  getMessages,
  createMessage
};
