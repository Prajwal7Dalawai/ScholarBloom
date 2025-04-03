const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const {
    getProfile,
    updateProfile,
    updateAcademicDetails,
    getEduCoins,
    earnEduCoins,
    spendEduCoins,
    getAvailableScholarships,
    applyForScholarship,
    getScholarshipApplications,
    getAvailableCourses,
    enrollInCourse,
    getEnrolledCourses,
    updateCourseProgress
} = require("../controls/studentControls");

// Student Profile Routes
router.get("/profile", verifyToken, wrapAsync(getProfile));
router.put("/profile", verifyToken, wrapAsync(updateProfile));
router.put("/academic-details", verifyToken, wrapAsync(updateAcademicDetails));

// EduCoins Routes
router.get("/educoins", verifyToken, wrapAsync(getEduCoins));
router.post("/educoins/earn", verifyToken, wrapAsync(earnEduCoins));
router.post("/educoins/spend", verifyToken, wrapAsync(spendEduCoins));

// Scholarship Routes
router.get("/scholarships/available", verifyToken, wrapAsync(getAvailableScholarships));
router.post("/scholarships/:id/apply", verifyToken, wrapAsync(applyForScholarship));
router.get("/scholarships/applications", verifyToken, wrapAsync(getScholarshipApplications));

// Course Routes
router.get("/courses/available", verifyToken, wrapAsync(getAvailableCourses));
router.post("/courses/:id/enroll", verifyToken, wrapAsync(enrollInCourse));
router.get("/courses/enrolled", verifyToken, wrapAsync(getEnrolledCourses));
router.put("/courses/:id/progress", verifyToken, wrapAsync(updateCourseProgress));

module.exports = router;