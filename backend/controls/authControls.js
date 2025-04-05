const admin = require('firebase-admin');
const User = require("../models/user-schema");
const serviceAccount = require("../utils/scholarbloom-ffaa4-firebase-adminsdk-fbsvc-206f543911.json");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Register new user
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Google login
const googleSignin = async (req, res) => {
    try {
        console.log('Processing Google signin...');
        const { idToken } = req.body;
        const userType = req.path.includes('university') ? 'university' : 'student';
        
        if (!idToken) {
            console.log('No Google credential provided');
            return res.status(400).json({ error: "Google credential is required" });
        }

        // Verify the Google credential
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Google token verified for:', decodedToken.email);
        
        // Check if user already exists
        let user = await User.findOne({ email: decodedToken.email });
        
        if (!user) {
            console.log('Creating new user for:', decodedToken.email);
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
            console.log('New user created:', user._id);
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

        console.log('Google signin successful for:', user.email);

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
        console.error("Google signin error:", error);
        return res.status(500).json({ 
            error: "Failed to sign in with Google", 
            details: error.message 
        });
    }
};

const googleLogin = async (req, res) => {
    try {
        console.log('Processing Google login...');
        const { idToken } = req.body;
        if (!idToken) {
            console.log('No Google credential provided');
            return res.status(400).json({ error: "Google credential is required" });
        }

        // Verify the Google credential
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Google token verified for:', decodedToken.email);
        
        // Check if user already exists
        let user = await User.findOne({ email: decodedToken.email });
        
        if (!user) {
            console.log('User not found:', decodedToken.email);
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

        console.log('Google login successful for:', user.email);

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
        return res.status(500).json({ 
            error: "Failed to login with Google", 
            details: error.message 
        });
    }
};

// Regular login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        console.log('Processing logout...');
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
        console.log('Verifying user token...');
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            console.log('User not found during verification');
            return res.status(404).json({ error: "User not found" });
        }

        console.log('Token verified successfully for:', user.email);
        return res.status(200).json({ user });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(500).json({ 
            error: "Token verification failed", 
            details: error.message 
        });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.name = name || user.name;
        user.email = email || user.email;

        // Handle profile picture if uploaded
        if (req.file) {
            user.profilePicture = req.file.path;
        }

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    googleLogin,
    googleSignin,
    logout,
    verify,
    getProfile,
    updateProfile,
    changePassword
};