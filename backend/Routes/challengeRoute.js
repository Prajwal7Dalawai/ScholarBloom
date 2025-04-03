const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getSubmissions, getChallenges, getChallenge, createChallenge, updateChallenge, deleteChallenge } = require('../controls/challengeControls');

// Get challenge submissions
router.get('/submissions', verifyToken, getSubmissions);

// Get all challenges
router.get('/', verifyToken, getChallenges);

// Get a specific challenge
router.get('/:challengeId', verifyToken, getChallenge);

// Create a new challenge
router.post('/', verifyToken, createChallenge);

// Update a challenge
router.put('/:challengeId', verifyToken, updateChallenge);

// Delete a challenge
router.delete('/:challengeId', verifyToken, deleteChallenge);

module.exports = router; 