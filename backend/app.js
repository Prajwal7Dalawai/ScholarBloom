const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoute");
const scholarshipRoutes = require("./routes/scholarships");
const jobRoutes = require("./routes/jobs");
const challengeRoutes = require("./Routes/challengeRoute");
const submissionRoutes = require("./Routes/submissionRoute");
const studentRoutes = require("./Routes/studentRoute");

app.use("/api/auth", authRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/challenges/submissions", submissionRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/student", studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something went wrong!", 
        details: err.message 
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
