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
const authControls = require('../controls/authControls');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile-pictures');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Student Profile Routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, upload.single('profilePicture'), updateProfile);
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

// Student routes
router.post('/register', authControls.register);
router.post('/login', authControls.login);
router.put('/password', verifyToken, authControls.changePassword);

module.exports = router;