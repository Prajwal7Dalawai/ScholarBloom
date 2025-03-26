const Job = require('../models/job-schema.js');
const User = require('../models/user-schema.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.createJob = wrapAsync(async (req, res) => {
    try{
    const user = User.findOne({ email: res.locals.currentUser.email });
    const {title, desc, deadline} = req.body;
    const job = new Job({
        universityId: user._id,
        jobTitle: title,
        jobDescription: desc,
        deadline: deadline
    });
   await user.updateOne({ $push: { "universityDetails.postedJobs": job._id } });
    await job.save();
    res.json({message: "Job created successfully"});
}
catch(err){
    res.status(400).json({error: err.message});
}
});

module.exports.listAllJobs = wrapAsync(async (req, res) => {
    try{
    const jobs = await Job.find({},"jobTitle, jobDescription, deadline").populate('universityId','fullName location');
    res.json(jobs);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.listJobApplicants = wrapAsync(async (req, res) => {
    try{
    const user = User.findOne({ email: res.locals.currentUser.email });
    const job = Job.find({universityId: user._id}, "applicants").populate('applicants.studentId', 'fullName email studentDetails.grades studentDetails.eduCoins');
    res.json(job);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.applyJob = wrapAsync(async (req, res) => {
    try{
    const user = User.findOne({ email: res.locals.currentUser.email });
    const {jobId, resume} = req.body;
    const job = Job.findById(jobId);
    job.applicants.push({
        studentId: user._id,
        resumeLink: resume,
        appliedAt: Date.now(),
        status: "Pending"
    });
    await job.save();
    user.StudetDetails.appliedJobs.push(jobId);
    await user.save();
    res.json({message: "Applied to job successfully"});
}
catch(err){
    res.status(400).json({error: err.message});
}
});

module.exports.AppliedJobs = wrapAsync(async (req, res) => {
    try{
        const user = User.findOne({ email: res.locals.currentUser.email });
        const jobs = user.StudentDetails.appliedJobs;
        const appliedJobs = await Promise.all(jobs.map(jobId => Job.findById(jobId)));
        res.json(appliedJobs);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.acceptApplicant = wrapAsync(async (req, res) => {
    try{
        const user = User.findOne({ email: res.locals.currentUser.email });
        const {jobId, studentId} = req.body;
        const job = Job.findOne({_id: jobId, applicants: {$elemMatch: {studentId: studentId}}});
        job.applicants.forEach(applicant => {
            if(applicant.studentId == studentId){
                applicant.status = "Accepted";
            }
        });
        await job.save();
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

module.exports.rejectApplicant = wrapAsync(async (req, res) => {
    try{
        const user = User.findOne({ email: res.locals.currentUser.email });
        const {jobId, studentId} = req.body;
        const job = Job.findOne({_id: jobId, applicants: {$elemMatch: {studentId: studentId}}});
        job.applicants.forEach(applicant => {
            if(applicant.studentId == studentId){
                applicant.status = "Rejected";
            }
        });
        await job.save();
    }catch(err){
        res.status(400).json({error: err.message});
    }
});