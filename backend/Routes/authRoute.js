const express = require("express");
require("dotenv").config();
const admin = require("firebase-admin");
const User = require("../models/User-Schema");

const router = express.Router();

const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-6046a0601b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

router.post("/google/signin", async (req, res) => {
    try {
        const idToken = req.body.idToken; // Get the ID token from the client
        
        if (!idToken) {
          return res.status(400).json({ error: "ID token is required" });
        }
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = decodedToken; // Decoded token contains user info
        const registeredUser = {
          email: user.email,
          name: user.name,
          picture: user.picture,
          uid: user.uid,
          time: new Date().toString(),
        }
        await User.insertOne({ firebaseUID: user.uid, email: user.email, fullName: user.name, profilePic: user.picture });
        res.status(200).json({ registeredUser });
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
