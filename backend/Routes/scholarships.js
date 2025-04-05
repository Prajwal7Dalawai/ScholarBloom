const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship-Schema');
const User = require('../models/user-schema');
const { verifyToken } = require('../middleware');

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all scholarships...');
    const scholarships = await Scholarship.find();
    console.log(`Found ${scholarships.length} scholarships`);
    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ error: 'Failed to fetch scholarships', details: error.message });
  }
});

// Get scholarship by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching scholarship with ID: ${req.params.id}`);
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    console.log('Scholarship found:', scholarship.title);
    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship:', error);
    res.status(500).json({ error: 'Failed to fetch scholarship', details: error.message });
  }
});

// Create new scholarship (university only)
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('Creating new scholarship...');
    if (req.user.role !== 'university') {
      console.log('Unauthorized: Only universities can create scholarships');
      return res.status(403).json({ error: 'Only universities can create scholarships' });
    }

    const scholarship = new Scholarship({
      ...req.body,
      universityId: req.user._id
    });

    await scholarship.save();
    console.log('Scholarship created successfully:', scholarship._id);

    // Add scholarship to university's offered scholarships
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { 'universityDetails.scholarshipsOffered': scholarship._id } }
    );

    res.status(201).json(scholarship);
  } catch (error) {
    console.error('Error creating scholarship:', error);
    res.status(500).json({ error: 'Failed to create scholarship', details: error.message });
  }
});

// Update scholarship (university only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    console.log(`Updating scholarship with ID: ${req.params.id}`);
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    if (scholarship.universityId.toString() !== req.user._id.toString()) {
      console.log('Unauthorized: Only the creating university can update this scholarship');
      return res.status(403).json({ error: 'Only the creating university can update this scholarship' });
    }

    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log('Scholarship updated successfully');
    res.json(updatedScholarship);
  } catch (error) {
    console.error('Error updating scholarship:', error);
    res.status(500).json({ error: 'Failed to update scholarship', details: error.message });
  }
});

// Delete scholarship (university only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    console.log(`Deleting scholarship with ID: ${req.params.id}`);
    const scholarship = await Scholarship.findById(req.params.id);
    
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    if (scholarship.universityId.toString() !== req.user._id.toString()) {
      console.log('Unauthorized: Only the creating university can delete this scholarship');
      return res.status(403).json({ error: 'Only the creating university can delete this scholarship' });
    }

    // Remove scholarship from university's offered scholarships
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { 'universityDetails.scholarshipsOffered': scholarship._id } }
    );

    // Remove scholarship from all students' applied scholarships
    await User.updateMany(
      { 'studentDetails.appliedScholarships': scholarship._id },
      { $pull: { 'studentDetails.appliedScholarships': scholarship._id } }
    );

    await scholarship.deleteOne();
    console.log('Scholarship deleted successfully');
    res.json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    res.status(500).json({ error: 'Failed to delete scholarship', details: error.message });
  }
});

// Apply for scholarship (student only)
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    console.log(`Processing scholarship application for ID: ${req.params.id}`);
    if (req.user.role !== 'student') {
      console.log('Unauthorized: Only students can apply for scholarships');
      return res.status(403).json({ error: 'Only students can apply for scholarships' });
    }

    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Check if student has already applied
    if (req.user.studentDetails.appliedScholarships.includes(scholarship._id)) {
      console.log('Student has already applied for this scholarship');
      return res.status(400).json({ error: 'You have already applied for this scholarship' });
    }

    // Add scholarship to student's applied scholarships
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { 'studentDetails.appliedScholarships': scholarship._id } }
    );

    console.log('Scholarship application submitted successfully');
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting scholarship application:', error);
    res.status(500).json({ error: 'Failed to submit application', details: error.message });
  }
});

module.exports = router; 