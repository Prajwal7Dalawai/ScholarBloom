const express = require('express');
const authMiddleware = require('../middleware'); // Import the auth middleware
const scholarshipController = require('../controls/scholarshipController');
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

router.get('/', authMiddleware.verifySession ,wrapAsync(scholarshipController.getAllScholarships));

module.exports = router;
