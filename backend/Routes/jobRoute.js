const express = require('express');
const router = express.Router();
const scholarship = require('../controls/scholarshipController');
const middleware = require('../middleware');

router.get('/jobs', middleware.verifySession, scholarship.listAllJobs);