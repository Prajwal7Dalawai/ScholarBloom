const User = require('../models/user-schema.js');
const Scholarship = require('../models/Scholarship-Schema.js');
const Job = require('../models/job-schema.js');

module.exports.uniDashData =async (req, res) => {
    try{
    const user = await User.findOne({email: req.user.email});
    const scholarships = await Scholarship.find({ university: user._id }) // Find by university ID
            .sort({ createdAt: -1 }) // Sort by creation date (newest first)
            .limit(2); // Get only the top 2
    const jobs = await Job.find({ universityId: user._id }) // Find by university ID
                .sort({ postedAt: -1 }) // Sort by creation date (newest first)
                .limit(2); // Get only the top 2
    res.json({user,scholarships,jobs});
    }catch(err){
        console.log(err);
    }
};
