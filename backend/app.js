const express = require('express');
const User = require('./models/User-Schema');
const mongoose = require('mongoose');
const EduCoins = require('./models/EduCoins-Schema');
const Scholarship = require('./models/Scholarship-Schema');
const app = express();

const connectDB = require('./mongo-Connect');
require("dotenv").config();
app.use(express.json());

const authRoute = require('./Routes/authRoute');
const scholarRoute = require('./Routes/scholarshipRoute');

app.use("/auth",authRoute);
app.use("/scholarship",scholarRoute);

const port  = 3000;

app.listen(port,()=>{console.log(`Server is listening to port ${port}`)});

connectDB();