const Job = require('../models/job-schema.js');
const User = require('../models/user-schema.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}, "jobTitle jobDescription deadline").populate('universityId', 'fullName location');
        res.json(jobs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.createJobPosting = async (req, res) => {
    try {
        const user = await User.findOne({ email: res.locals.currentUser.email });
        const { title, desc, deadline } = req.body;
        const job = new Job({
            universityId: user._id,
            jobTitle: title,
            jobDescription: desc,
            deadline: deadline
        });
        await user.updateOne({ $push: { "universityDetails.postedJobs": job._id } });
        await job.save();
        res.json({ message: "Job created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.getJobDetails = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('universityId', 'fullName location');
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.updateJobPosting = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, universityId: req.user.uid },
            req.body,
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json({ message: "Job updated successfully", job });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.deleteJobPosting = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            universityId: req.user.uid
        });
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.applyForJob = async (req, res) => {
    try {
        const user = await User.findOne({ email: res.locals.currentUser.email });
        const { jobId, resume } = req.body;
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        job.applicants.push({
            studentId: user._id,
            resume: resume,
            status: "pending",
            appliedAt: new Date()
        });

        await job.save();
        res.json({ message: "Applied for job successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.getJobApplications = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            universityId: req.user.uid
        }).populate('applicants.studentId', 'fullName email studentDetails.grades studentDetails.eduCoins');
        
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json(job.applicants);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.updateJobApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        
        const job = await Job.findOneAndUpdate(
            { 
                _id: req.params.id,
                universityId: req.user.uid,
                "applicants._id": applicationId
            },
            { $set: { "applicants.$.status": status } },
            { new: true }
        );
        
        if (!job) {
            return res.status(404).json({ error: "Job or application not found" });
        }
        res.json({ message: "Application status updated successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};