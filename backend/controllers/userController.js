const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    // Exclude password hash
    const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving users list' });
  }
};

// @desc    Toggle user status (active / suspended)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['active', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Status must be either active or suspended' });
    }

    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Admin account status cannot be modified' });
      }

      user.status = status;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        status: updatedUser.status
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error modifying user status' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: 'Admin account cannot be deleted' });
      }

      await user.deleteOne();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error removing user' });
  }
};

module.exports = {
  getUsers,
  updateUserStatus,
  deleteUser
};
