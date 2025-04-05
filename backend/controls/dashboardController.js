const User = require('../models/user-schema.js');
const Scholarship = require('../models/Scholarship-Schema.js');
const Job = require('../models/job-schema.js');

module.exports.uniDashData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const scholarships = await Scholarship.find({ universityId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(2);
        const jobs = await Job.find({ universityId: req.user._id })
            .sort({ postedAt: -1 })
            .limit(2);
        
        if (!user) {
            return res.status(404).json({ error: "University not found" });
        }

        res.status(200).json({ user, scholarships, jobs });
    } catch (err) {
        console.error("Dashboard Data Error:", err);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
};
