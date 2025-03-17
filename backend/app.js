const express = require('express');
const cors = require('cors'); // Import CORS

const session = require('express-session');
const app = express();
const connectDB = require('./mongo-Connect');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

app.use(session({
    secret: 'mamasboyy', // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

// Other routes and middleware
app.use('/auth', require('./Routes/authRoute'));

app.use("/scholar",require("./Routes/scholarshipRoute"));

app.use((req,res,next)=>{
    res.locals.currentUser = req.session.user;
});

const port  = 3000;

app.listen(port,()=>{console.log(`Server is listening to port ${port}`)});

connectDB();
