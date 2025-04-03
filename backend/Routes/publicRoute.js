const express = require("express");
const router = express.Router();
const publicController = require("../controls/publicControls.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Public Scholarship Routes
router.get("/scholarships", wrapAsync(publicController.getPublicScholarships));
router.get("/scholarships/:id", wrapAsync(publicController.getPublicScholarshipDetails));

// Public Course Routes
router.get("/courses", wrapAsync(publicController.getPublicCourses));
router.get("/courses/:id", wrapAsync(publicController.getPublicCourseDetails));

// Public Job Routes
router.get("/jobs", wrapAsync(publicController.getPublicJobs));
router.get("/jobs/:id", wrapAsync(publicController.getPublicJobDetails));

// Public University Routes
router.get("/universities", wrapAsync(publicController.getPublicUniversities));
router.get("/universities/:id", wrapAsync(publicController.getPublicUniversityDetails));

// Contact Form Route
router.post("/contact", wrapAsync(publicController.submitContactForm));

module.exports = router; 