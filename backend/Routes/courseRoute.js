const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    getAllCourses,
    createCourse,
    getCourseDetails,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    getCourseEnrollments,
    updateEnrollmentStatus
} = require("../controls/courseController");

// Course Routes
router.get("/", verifyToken, getAllCourses);
router.post("/", verifyToken, createCourse);
router.get("/:id", verifyToken, getCourseDetails);
router.put("/:id", verifyToken, updateCourse);
router.delete("/:id", verifyToken, deleteCourse);
router.post("/:id/enroll", verifyToken, enrollInCourse);
router.get("/:id/enrollments", verifyToken, getCourseEnrollments);
router.put("/:id/enrollments/:enrollmentId", verifyToken, updateEnrollmentStatus);

module.exports = router; 