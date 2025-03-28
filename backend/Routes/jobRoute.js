const express = require('express');
const router = express.Router();
const scholarship = require('../controls/scholarshipController');
const middleware = require('../middleware');
const wrapAsync = require("../utils/wrapAsync.js");
router.get('/jobs', middleware.verifySession, wrapAsync(scholarship.listAllJobs));
module.exports = router;