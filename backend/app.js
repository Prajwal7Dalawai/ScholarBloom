const express = require('express');
const User = require('./models/User-Schema');
const mongoose = require('mongoose');
const EduCoins = require('./models/EduCoins-Schema');
const Scholarship = require('./models/Scholarship-Schema');
const app = express();
<<<<<<< HEAD
=======
const cors = require('cors');
>>>>>>> main

const connectDB = require('./mongo-Connect');
require("dotenv").config();
app.use(express.json());

const authRoute = require('./Routes/authRoute');
const scholarRoute = require('./Routes/scholarshipRoute');
<<<<<<< HEAD

app.use("/auth",authRoute);
app.use("/scholarship",scholarRoute);
=======
app.use(cors({
    origin: 'http://localhost:5173' // Adjust this to match your frontend's URL
}));
app.use("/auth", authRoute);

app.use("/scholar",scholarRoute);
>>>>>>> main

const port  = 3000;

app.listen(port,()=>{console.log(`Server is listening to port ${port}`)});

<<<<<<< HEAD
connectDB();
=======
connectDB();
>>>>>>> main
