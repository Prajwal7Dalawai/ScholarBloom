const express = require('express');
const router = express.Router();
const User = require('../models/user-schema');
const { verifyToken } = require('../middleware/auth');
const Scholarship = require('../models/Scholarship-Schema');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get student profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Error fetching student profile' });
  }
});

// Update student profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, education, skills } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, address, education, skills },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({ message: 'Error updating student profile' });
  }
});

// Get student's applications
router.get('/applications', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.applications || []);
  } catch (error) {
    console.error('Error fetching student applications:', error);
    res.status(500).json({ message: 'Error fetching student applications' });
  }
});

// Get student's challenges
router.get('/challenges', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.challenges || []);
  } catch (error) {
    console.error('Error fetching student challenges:', error);
    res.status(500).json({ message: 'Error fetching student challenges' });
  }
});

// Get student's EduCoins balance
router.get('/educoins', verifyToken, async (req, res) => {
  try {
    console.log('Fetching EduCoins for student:', req.user.id);
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user with EduCoins:', user.educoins);
    res.json({ educoins: user.educoins || 0 });
  } catch (error) {
    console.error('Error fetching EduCoins:', error);
    res.status(500).json({ message: 'Error fetching EduCoins', error: error.message });
  }
});

// Apply for a scholarship
router.post('/scholarships/apply', verifyToken, upload.array('documents', 5), async (req, res) => {
  try {
    console.log('Processing scholarship application for student:', req.user.id);
    const { scholarshipId, eligibilityProof, statementOfPurpose } = req.body;
    
    if (!scholarshipId || !eligibilityProof || !statementOfPurpose) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Check if already applied
    if (user.applications && user.applications.includes(scholarshipId)) {
      console.log('Student has already applied for this scholarship');
      return res.status(400).json({ message: 'You have already applied for this scholarship' });
    }

    // Check if student has enough EduCoins
    if (user.educoins < scholarship.requiredEduCoins) {
      console.log('Insufficient EduCoins');
      return res.status(400).json({ message: 'Insufficient EduCoins to apply' });
    }

    // Save documents
    const documentUrls = req.files.map(file => file.path);
    console.log('Saved documents:', documentUrls);

    // Update user's applications and deduct EduCoins
    if (!user.applications) {
      user.applications = [];
    }
    user.applications.push({
      scholarshipId,
      status: 'pending',
      documents: documentUrls,
      eligibilityProof,
      statementOfPurpose,
      appliedAt: new Date()
    });
    user.educoins -= scholarship.requiredEduCoins;
    await user.save();
    console.log('Updated user record');

    // Update scholarship applicants
    if (!scholarship.applicants) {
      scholarship.applicants = [];
    }
    scholarship.applicants.push(user._id);
    await scholarship.save();
    console.log('Updated scholarship record');

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

module.exports = router; 