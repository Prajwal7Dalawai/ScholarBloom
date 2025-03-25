const express = require('express');
const authMiddleware = require('../middleware'); // Import the auth middleware
const scholarshipController = require('../controllers/scholarshipController');

const router = express.Router();

router.get('/', scholarshipController.getAllScholarships);

module.exports = router;
