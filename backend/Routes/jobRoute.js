const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { getAllJobs,createJobPosting,getJobDetails,updateJobPosting,deleteJobPosting,applyForJob,getJobApplications,updateJobApplicationStatus} = require("../controls/jobController");
const wrapAsync = require("../utils/wrapAsync.js");

router.get('/jobs', verifyToken, wrapAsync(getAllJobs));
router.post('/jobs', verifyToken, wrapAsync(createJobPosting));
router.get('/jobs/:id', verifyToken, wrapAsync(getJobDetails));
router.put('/jobs/:id', verifyToken, wrapAsync(updateJobPosting));
router.delete('/jobs/:id', verifyToken, wrapAsync(deleteJobPosting));
router.post('/jobs/:id/apply', verifyToken, wrapAsync(applyForJob));
router.get('/jobs/:id/applications', verifyToken, wrapAsync(getJobApplications));
router.put('/jobs/:id/applications/:applicationId', verifyToken, wrapAsync(updateJobApplicationStatus));

module.exports = router;