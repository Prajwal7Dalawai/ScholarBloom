const admin = require('firebase-admin');
const User = require("../models/user-schema");
const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-206f543911.json");
require("dotenv").config();
const jwt = require("jsonwebtoken");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

// Register new user
const register = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            role: role || "student", // Default role is student
            studentDetails: {
                eduCoins: 0,
                grade: "",
                skills: [],
                appliedScholarships: [],
                appliedJobs: []
            }
        });

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: user._id, 
                role: user.role, 
                email: user.email, 
                name: user.fullName 
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: "720h" }
        );

        return res.status(201).json({ 
            message: "Registration successful", 
            token, 
            user 
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            error: "Registration failed", 
            details: error.message 
        });
    }
};

// Google login
const googleSignin = async (req, res) => {
    try {
        const { idToken } = req.body;
        const userType = req.path.includes('university') ? 'university' : 'student';
        
        if (!idToken) {
            return res.status(400).json({ error: "Google credential is required" });
        }

        // Verify the Google credential
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        // Check if user already exists
        let user = await User.findOne({ email: decodedToken.email });
        
        if (!user) {
            // Create new user with MongoDB schema
            const locationResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_LOCATION}`);
            const locationData = await locationResponse.json();
            
            user = await User.create({
                fullName: decodedToken.name,
                email: decodedToken.email,
                firebaseUID: decodedToken.uid,
                role: userType,
                profilePic: decodedToken.picture,
                location: {
                    city: locationData.city || "Unknown",
                    state: locationData.state_prov || "Unknown",
                    country: locationData.country_name || "Unknown"
                },
                studentDetails: userType === 'student' ? {
                    eduCoins: 0,
                    grade: "",
                    skills: [],
                    appliedScholarships: [],
                    appliedJobs: []
                } : undefined,
                universityDetails: userType === 'university' ? {
                    courses: [],
                    scholarships: [],
                    jobs: []
                } : undefined
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: user._id, 
                role: user.role, 
                email: user.email, 
                name: user.fullName 
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: "720h" }
        );

        // Return success response with token and user data
        return res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ error: "Failed to login with Google" });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { idToken} = req.body;
        if (!idToken) {
            return res.status(400).json({ error: "Google credential is required" });
        }

        // Verify the Google credential
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        
        // Check if user already exists
        let user = await User.findOne({ email: decodedToken.email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found. Please sign up first." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: user._id, 
                role: user.role, 
                email: user.email, 
                name: user.fullName 
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: "720h" }
        );

        // Return success response with token and user data
        return res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ error: "Failed to login with Google" });
    }
};

// Regular login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // TODO: Implement password verification
        // For now, we'll just generate a token
        const token = jwt.sign(
            { 
                _id: user._id, 
                role: user.role, 
                email: user.email, 
                name: user.fullName 
            }, 
            process.env.SECRET_KEY, 
            { expiresIn: "720h" }
        );

        return res.status(200).json({ 
            message: "Login successful", 
            token, 
            user 
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            error: "Login failed", 
            details: error.message 
        });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        // Since we're using JWT, we don't need to do anything server-side
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ 
            error: "Logout failed", 
            details: error.message 
        });
    }
};

// Verify token and get user
const verify = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Verify Error:", error);
        return res.status(500).json({ error: "Failed to verify user" });
    }
};

module.exports = {
    register,
    login,
    googleSignin,
    googleLogin,
    logout,
    verify
};