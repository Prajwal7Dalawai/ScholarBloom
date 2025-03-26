const express = require('express');
const router = express.Router();
const middleware = require('../middleware');


router.post('/sch/apply', middleware.verifySession);