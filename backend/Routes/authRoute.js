const express = require("express");
const { getAuth, GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
require("dotenv").config();
const admin = require("firebase-admin");

const router = express.Router();


const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-6046a0601b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


// 🔹 Firebase Config
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Google Sign-In Function
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        throw error;
    }
};
// 🔹 Google Sign-In API
router.post("/google", async (req, res) => {
    try {
        const user = await signInWithGoogle();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Google Sign-In Failed", details: error.message });
    }
});

// 🔹 Logout API
router.post("/logout", (req, res) => {
    auth.signOut()
        .then(() => res.status(200).json({ message: "Logged out successfully" }))
        .catch((error) => res.status(500).json({ error: "Logout failed" }));
});

module.exports = router;
