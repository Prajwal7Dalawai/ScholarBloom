const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    register,
    login,
    googleLogin,
    googleSignin,
    logout,
    verify
} = require("../controls/authControls");
const wrapAsync = require("../utils/wrapAsync");

// Auth Routes
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));
router.post('/google/login', wrapAsync(googleLogin));
router.post("/google/student", wrapAsync(googleSignin));
router.post("/google/university", wrapAsync(googleSignin));
router.get("/logout", wrapAsync(logout));
router.get("/verify", verifyToken, wrapAsync(verify));

module.exports = router;
