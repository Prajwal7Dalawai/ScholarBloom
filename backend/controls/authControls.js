const admin = require('firebase-admin');
const User = require("../models/User-Schema");
const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-6046a0601b.json");
require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports.StudentSignin = async (req, res) => {
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
            role: "student"
        };

        // Create a session for the user
        req.session.user = {
            uid: user.uid,
            role: "student",
            exp: user.exp
        };


        let verifyEmail = await User.findOne({ email: user.email });
        if (!verifyEmail) {
            await User.create({ firebaseUID: user.uid, email: user.email, fullName: user.name, profilePic: user.picture, role: "student" });
            return res.status(201).json({ registeredUser });
        } else {
            return res.status(200).json({ registeredUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Google Sign-In Failed", details: error.message });
    }
};

module.exports.UniSignin = async (req, res) => {
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
            role: "university"
        };

        req.session.user = {
            uid: user.uid,
            role: "university",
            exp: user.exp
        };


        let verifyEmail = await User.findOne({ email: user.email });
        if (!verifyEmail) {
            await User.create({ firebaseUID: user.uid, email: user.email, fullName: user.name, profilePic: user.picture, role: "university" });
            return res.status(201).json({ registeredUser });
        } else {
            return res.status(200).json({ registeredUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Google Sign-In Failed", details: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        const idToken = req.body.idToken; // Get the ID token from the client
        if (!idToken) {
            return res.status(400).json({ error: "ID token is required" });
        }
        
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = decodedToken; // Decoded token contains user info
        let verifyEmail = await User.findOne({ email: user.email });
        if (verifyEmail) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Google Login Failed", details: error.message });
    }
};
