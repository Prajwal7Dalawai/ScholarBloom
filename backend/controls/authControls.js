const admin = require('firebase-admin');
const User = require("../models/user-schema");
const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-6046a0601b.json");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");

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
        const ip = req.ip;
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);

        console.log(process.env.SECRET_KEY);
        let verifyEmail = await User.findOne({ email: user.email });
        const sessionToken = jwt.sign({ uid: user.uid, role: "student", email:user.email, name:user.name }, process.env.SECRET_KEY, { expiresIn: "720h" });
        res.cookie("session", sessionToken, { httpOnly: true, secure: true, sameSite: "none" , maxAge: 30*24*60*60*1000});
        if (!verifyEmail) {
            await User.create({ firebaseUID: user.uid, email: user.email, fullName: user.name, profilePic: user.picture, role: "student", location: { city: response.data.city, state: response.data.region, country: response.data.country } });
        } 
        return res.status(200).json({  message: "Login successful", sessionToken, registeredUser });
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
        const ip = req.ip;
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        let verifyEmail = await User.findOne({ email: user.email });
        const sessionToken = jwt.sign({ uid: user.uid, role: "university", email:user.email, name:user.name }, process.env.SECRET_KEY, { expiresIn: "720h" });
        res.cookie("session", sessionToken, { httpOnly: true, secure: true, sameSite: "none" , maxAge: 30*24*60*60*1000});
        if (!verifyEmail) {
            await User.create({ firebaseUID: user.uid, email: user.email, fullName: user.name, profilePic: user.picture, role: "university", location: { city: response.data.city, state: response.data.region, country: response.data.country } });
        } 
        return res.status(200).json({  message: "Login successful", sessionToken, registeredUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Google Sign-In Failed", details: error.message });
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("session", {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: "lax" // Adjust if frontend & backend have different origins
        });
        return res.status(200).json({ message: "Logout successful" });
    }
    catch(error){
        res.status(500).json({ error: "Logout failed" });
    }
}

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
            const sessionToken = jwt.sign({ uid: user.uid, role: verifyEmail.role, email:user.email, name:user.name }, process.env.SECRET_KEY, { expiresIn: "720h" });
            res.cookie("session", sessionToken, { httpOnly: true, secure: true, sameSite: "none" , maxAge: 30*24*60*60*1000});
            return res.status(200).json({ message: "Login successful", sessionToken, verifyEmail });
        } 
        return res.status(400).json({error: "User not found, Please sign in"  });
    }catch(error){
        res.status(500).json({ error: "Login failed" });
    }
};