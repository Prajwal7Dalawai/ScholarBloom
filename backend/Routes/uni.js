const express = require('express');
const router = express.Router();
const scholarship = require('../controls/scholarshipController');
const middleware = require('../middleware');

//Routes related to scholarships
router.post('/sch/create', middleware.verifySession ,scholarship.createScholarship);
router.get('/sch/all', middleware.verifySession ,scholarship.getAllScholarships);
router.get('/sch/selected/',middleware.verifySession,scholarship.listSelectedScholarships);
router.get('sch/applicants',middleware.verifySession,scholarship.ScholarshipApplicants);

//Routes Related to Job application
// router.post('job/create',middleware.verifySession,scholarship.createJob);

module.exports = router;