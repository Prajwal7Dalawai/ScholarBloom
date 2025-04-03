const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ error: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Check for both _id and uid in the decoded token
        const userId = decoded._id || decoded.uid;
        
        if (!userId) {
            return res.status(401).json({ error: "Invalid token format" });
        }
        
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = {
    verifyToken
}; 