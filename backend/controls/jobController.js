const Job = require('../models/job-schema.js');
const User = require('../models/user-schema.js');
const wrapAsync = require('../utils/wrapAsync.js');
const JobApplication = require('../models/jobApplication-schema.js');

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
        const { id } = req.params;
        const studentId = req.user._id;

        // Check if job exists
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const alreadyApplied = job.applicants.some(app => 
            app.studentId.toString() === studentId.toString()
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Get student details
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Add application to job
        job.applicants.push({
            studentId: studentId,
            resumeLink: student.studentDetails?.resumeLink || '',
            status: 'Pending',
            appliedAt: new Date()
        });

        await job.save();

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error in applyForJob:', error);
        res.status(500).json({ message: 'Internal server error' });
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