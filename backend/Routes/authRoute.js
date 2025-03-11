const express = require("express");
<<<<<<< HEAD
const { getAuth, signInWithPopup, GoogleAuthProvider } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
require("dotenv").config();

const router = express.Router();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID
};

=======
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
>>>>>>> main
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

<<<<<<< HEAD
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
=======
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
>>>>>>> main
    }
});

// 🔹 Logout API
router.post("/logout", (req, res) => {
    auth.signOut()
        .then(() => res.status(200).json({ message: "Logged out successfully" }))
        .catch((error) => res.status(500).json({ error: "Logout failed" }));
});

module.exports = router;
