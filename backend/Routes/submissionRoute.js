const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getSubmissions, getSubmission, createSubmission, updateSubmission, deleteSubmission } = require('../controls/submissionControls');

// Get all submissions
router.get('/', verifyToken, getSubmissions);

// Get a specific submission
router.get('/:submissionId', verifyToken, getSubmission);

// Create a new submission
router.post('/', verifyToken, createSubmission);

// Update a submission
router.put('/:submissionId', verifyToken, updateSubmission);

// Delete a submission
router.delete('/:submissionId', verifyToken, deleteSubmission);

module.exports = router; 