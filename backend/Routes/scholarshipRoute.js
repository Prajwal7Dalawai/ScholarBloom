const express = require('express');
const authMiddleware = require('../middleware'); // Import the auth middleware

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
    res.json({ message: "Scholarship data" });
});


module.exports = router;
