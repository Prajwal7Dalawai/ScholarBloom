const express = require('express');
const router = express.Router();
const User = require('../models/user-schema');
const verifyToken = require('../Middleware/verifyToken');

// Get university profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user);
    const university = await User.findById(req.user._id)
      .select('-password')
      .where('role').equals('university');
    
    console.log('Found university:', university);
    
    if (!university) {
      console.log('University not found for user:', req.user._id);
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    console.error('Error fetching university profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update university profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    console.log('Updating profile for user:', req.user);
    console.log('Update data:', req.body);
    
    const { fullName, email, location, profilePic } = req.body;
    
    const university = await User.findById(req.user._id)
      .where('role').equals('university');

    if (!university) {
      console.log('University not found for user:', req.user._id);
      return res.status(404).json({ message: 'University not found' });
    }

    // Update fields
    university.fullName = fullName || university.fullName;
    university.email = email || university.email;
    university.location = location || university.location;
    university.profilePic = profilePic || university.profilePic;
    university.updatedAt = Date.now();

    await university.save();
    console.log('Updated university:', university);
    res.json(university);
  } catch (error) {
    console.error('Error updating university profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 