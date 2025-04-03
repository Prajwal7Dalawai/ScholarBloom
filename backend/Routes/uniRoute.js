const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    getProfile,
    updateProfile,
    updateUniversityDetails,
    createScholarship,
    getScholarships,
    getScholarshipDetails,
    updateScholarship,
    deleteScholarship,
    getScholarshipApplications,
    updateApplicationStatus,
    createCourse,
    getCourses,
    getCourseDetails,
    updateCourse,
    deleteCourse,
    getCourseEnrollments,
    createJobPosting,
    getJobPostings,
    getJobDetails,
    updateJobPosting,
    deleteJobPosting,
    getJobApplications,
    updateJobApplicationStatus,
    getScholarshipAnalytics,
    getCourseAnalytics,
    getJobAnalytics
} = require("../controls/uniControls");

// Profile Routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/university-details", verifyToken, updateUniversityDetails);

// Scholarship Routes
router.post("/scholarships", verifyToken, createScholarship);
router.get("/scholarships", verifyToken, getScholarships);
router.get("/scholarships/:id", verifyToken, getScholarshipDetails);
router.put("/scholarships/:id", verifyToken, updateScholarship);
router.delete("/scholarships/:id", verifyToken, deleteScholarship);
router.get("/scholarships/:id/applications", verifyToken, getScholarshipApplications);
router.put("/scholarships/:id/applications/:applicationId", verifyToken, updateApplicationStatus);

// Course Routes
router.post("/courses", verifyToken, createCourse);
router.get("/courses", verifyToken, getCourses);
router.get("/courses/:id", verifyToken, getCourseDetails);
router.put("/courses/:id", verifyToken, updateCourse);
router.delete("/courses/:id", verifyToken, deleteCourse);
router.get("/courses/:id/enrollments", verifyToken, getCourseEnrollments);

// Job Routes
router.post("/jobs", verifyToken, createJobPosting);
router.get("/jobs", verifyToken, getJobPostings);
router.get("/jobs/:id", verifyToken, getJobDetails);
router.put("/jobs/:id", verifyToken, updateJobPosting);
router.delete("/jobs/:id", verifyToken, deleteJobPosting);
router.get("/jobs/:id/applications", verifyToken, getJobApplications);
router.put("/jobs/:id/applications/:applicationId", verifyToken, updateJobApplicationStatus);

// Analytics Routes
router.get("/analytics/scholarships", verifyToken, getScholarshipAnalytics);
router.get("/analytics/courses", verifyToken, getCourseAnalytics);
router.get("/analytics/jobs", verifyToken, getJobAnalytics);

module.exports = router;
