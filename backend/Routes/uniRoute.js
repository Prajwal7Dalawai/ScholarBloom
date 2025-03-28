const express = require('express');
const router = express.Router();
const scholarship = require('../controls/scholarshipController');
const middleware = require('../middleware');
const wrapAsync = require("../utils/wrapAsync.js");
const User = require('../models/user-schema.js');
const dashBoardData = require('../controls/dashboardController');
//Routes related to scholarships
router.post('/sch/create', middleware.verifySession ,scholarship.createScholarship);
router.get('/sch/all', middleware.verifySession ,scholarship.getAllScholarships);
router.get('/sch/selected/',middleware.verifySession,scholarship.listSelectedScholarships);
router.get('/sch/applicants',middleware.verifySession,scholarship.ScholarshipApplicants);
router.get('/',middleware.verifySession, wrapAsync(dashBoardData.uniDashData));

//Routes Related to Job application
router.post('/job/create',middleware.verifySession,wrapAsync(scholarship.createJob));

router.get('/job/list',middleware.verifySession,wrapAsync(scholarship.listJobApplicants));


module.exports = router;
