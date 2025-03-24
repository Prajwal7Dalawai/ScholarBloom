const jwt = require("jsonwebtoken");

const verifySession = (req, res, next) => {
    const token = req.cookies.session; // Get token from cookies

    if (!token) {
        return res.status(401).json({ error: "Unauthorized User: No session token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        console.log("Decoded User:", decoded); // Debug decoded token
        req.user = decoded; // Store user data in `req.user`
        next(); // Proceed to next middleware
    } catch (error) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ error: "Invalid session token" });
    }
};

module.exports = { verifySession };
