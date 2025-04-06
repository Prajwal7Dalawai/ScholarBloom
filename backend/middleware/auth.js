const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");

const verifyToken = async (req, res, next) => {
    try {
        console.log("Headers received:", req.headers); // Debug log

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log("No authorization header found");
            return res.status(401).json({ error: "Authentication required - No auth header" });
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        if (!token) {
            console.log("No token found in auth header");
            return res.status(401).json({ error: "Authentication required - No token" });
        }

        console.log("Token received:", token.substring(0, 20) + "..."); // Debug log, only show first 20 chars

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded token:", decoded); // Debug log
        
        // Check for both _id and uid in the decoded token
        const userId = decoded._id || decoded.uid;
        
        if (!userId) {
            console.log("No user ID found in token");
            return res.status(401).json({ error: "Invalid token format - No user ID" });
        }
        
        const user = await User.findOne({ _id: userId });

        if (!user) {
            console.log("No user found with ID:", userId);
            return res.status(401).json({ error: "User not found" });
        }

        console.log("User found:", user._id); // Debug log
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ 
            error: "Invalid token",
            details: error.message
        });
    }
};

module.exports = {
    verifyToken
}; 