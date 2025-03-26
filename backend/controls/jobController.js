const Job = require('../models/job-schema.js');
const User = require('../models/user-schema.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.createJob = wrapAsync(async (req, res) => {
    const user = User.findOne({ email: res.locals.currentUser.email });
    const {title, desc, deadline} = req.body;
    const job = new Job({
        universityId: user._id,
        jobTitle: title,
        jobDescription: desc,
        deadline: deadline
    });
    await job.save();
    res.json({message: "Job created successfully"});
});

module.exports.listAllJobs = wrapAsync(async (req, res) => {
    const jobs = await Job.find({},"jobTitle, jobDescription, deadline").populate('universityId','fullName location');
    res.json(jobs);
});

module.exports.listJobApplicants = wrapAsync(async (req, res) => {
    const user = User.findOne({ email: res.locals.currentUser.email });
    const job = Job.find({universityId: user._id}, "applicants").populate('applicants.studentId', 'fullName email studentDetails.grades studentDetails.eduCoins');
    res.json(job);
});