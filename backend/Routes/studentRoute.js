const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const scholarship = require('../controls/scholarshipController');

router.post('/sch/apply', middleware.verifySession,scholarship.applyScholarship);
module.exports = router;