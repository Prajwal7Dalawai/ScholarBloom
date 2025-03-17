const express = require("express");
const authController = require("../controls/authControls.js");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

router.post("/google/Studentsignin", wrapAsync(authController.StudentSignin));
router.post("/google/UniSignin", wrapAsync(authController.UniSignin));

router.post('/login', wrapAsync(authController.login));
// 🔹 Logout API
router.post("/logout", (req, res) => {
    auth.signOut()
        .then(() => res.status(200).json({ message: "Logged out successfully" }))
        .catch((error) => res.status(500).json({ error: "Logout failed" }));
});

module.exports = router;
