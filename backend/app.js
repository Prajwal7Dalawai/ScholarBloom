const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./mongo-Connect");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { verifySession } = require("./middleware");

// ✅ Enable CORS with Credentials to Allow Cookies
app.use(cors({
    origin: "http://localhost:5173", // Adjust based on your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
});


app.set("trust proxy", true);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Route for authentication (stores session token in cookies)
app.use("/auth", require("./Routes/authRoute"));
app.use("/uni", require("./Routes/uniRoute"));
app.use("/job", require("./Routes/jobRoute"));
app.use("/sch", require("./Routes/scholarshipRoute"));
app.use("/student", require("./Routes/studentRoute"));

// ✅ Route to get user data (requires session token)
app.get("/user/data", verifySession, (req, res) => {
    res.json({ user: req.user });
});

// ✅ Route to check if session is active
app.get("/dashboard", verifySession, (req, res) => {
    res.json({ message: "Welcome to your dashboard", user: req.user });
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});
