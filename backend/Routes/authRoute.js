const express = require("express");
const { getAuth, signInWithPopup, GoogleAuthProvider } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
require("dotenv").config();

const router = express.Router();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

router.get('/',(req,res)=>{
    res.send("Hello I am scholar route");
});

// 🔹 Google Sign-In API
router.post("/google", async (req, res) => {
    try {
        const result = await signInWithPopup(auth, provider);
        res.status(200).json({ user: result.user });
    } catch (error) {
        res.status(500).json({ error: "Google Sign-In Failed" });
    }
});

// 🔹 Logout API
router.post("/logout", (req, res) => {
    auth.signOut()
        .then(() => res.status(200).json({ message: "Logged out successfully" }))
        .catch((error) => res.status(500).json({ error: "Logout failed" }));
});

module.exports = router;
