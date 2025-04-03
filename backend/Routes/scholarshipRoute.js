const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    getAllScholarships,
    createScholarship,
    getScholarshipDetails,
    updateScholarship,
    deleteScholarship,
    applyForScholarship,
    getScholarshipApplications,
    updateScholarshipApplicationStatus
} = require("../controls/scholarshipController");
const wrapAsync = require("../utils/wrapAsync");

// Scholarship Routes
router.get("/", verifyToken, wrapAsync(getAllScholarships));
router.post("/", verifyToken, wrapAsync(createScholarship));
router.get("/:id", verifyToken, wrapAsync(getScholarshipDetails));
router.put("/:id", verifyToken, wrapAsync(updateScholarship));
router.delete("/:id", verifyToken, wrapAsync(deleteScholarship));
router.post("/:id/apply", verifyToken, wrapAsync(applyForScholarship));
router.get("/:id/applications", verifyToken, wrapAsync(getScholarshipApplications));
router.put("/:id/applications/:applicationId", verifyToken, wrapAsync(updateScholarshipApplicationStatus));

module.exports = router;
