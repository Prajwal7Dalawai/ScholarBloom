const express = require("express");
const authController = require("../controls/authControls.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { verifySession } = require("../middleware.js");

router.post("/google/Studentsignin", wrapAsync(authController.StudentSignin));
router.post("/google/UniSignin", wrapAsync(authController.UniSignin));

router.post('/login', wrapAsync(authController.login));


// 🔹 Logout API
router.post("/logout", verifySession, wrapAsync(authController.logout));

module.exports = router;
