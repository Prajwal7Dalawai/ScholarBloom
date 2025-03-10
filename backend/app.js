const express = require('express');
const User = require('./models/User-Schema');
const mongoose = require('mongoose');
const EduCoins = require('./models/EduCoins-Schema');
const Scholarship = require('./models/Scholarship-Schema');
const app = express();

const connectDB = require('./mongo-Connect');
require("dotenv").config();
app.use(express.json());

connectDB();