const express = require("express");
const router = express.Router();
const Job = require("../models/Job-Schema");
const User = require("../models/user-schema");
const { verifyToken } = require("../middleware");

// Get all jobs
router.get("/", async (req, res) => {
    try {
        console.log('Fetching all jobs...');
        const jobs = await Job.find();
        console.log(`Found ${jobs.length} jobs`);
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ 
            error: "Failed to fetch jobs", 
            details: error.message 
        });
    }
});

// Get job by ID
router.get("/:id", async (req, res) => {
    try {
        console.log(`Fetching job with ID: ${req.params.id}`);
        const job = await Job.findById(req.params.id);
        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ error: "Job not found" });
        }
        console.log('Job found:', job.title);
        res.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ 
            error: "Failed to fetch job", 
            details: error.message 
        });
    }
});

// Create new job (university only)
router.post("/", verifyToken, async (req, res) => {
    try {
        console.log('Creating new job...');
        if (req.user.role !== "university") {
            console.log('Unauthorized: Only universities can create jobs');
            return res.status(403).json({ error: "Only universities can create jobs" });
        }

        const job = new Job({
            ...req.body,
            universityId: req.user._id
        });

        await job.save();
        console.log('Job created successfully:', job._id);

        // Add job to university's posted jobs
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { "universityDetails.postedJobs": job._id } }
        );

        res.status(201).json(job);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ 
            error: "Failed to create job", 
            details: error.message 
        });
    }
});

// Update job (university only)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        console.log(`Updating job with ID: ${req.params.id}`);
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ error: "Job not found" });
        }

        if (job.universityId.toString() !== req.user._id.toString()) {
            console.log('Unauthorized: Only the creating university can update this job');
            return res.status(403).json({ error: "Only the creating university can update this job" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        console.log('Job updated successfully');
        res.json(updatedJob);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ 
            error: "Failed to update job", 
            details: error.message 
        });
    }
});

// Delete job (university only)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        console.log(`Deleting job with ID: ${req.params.id}`);
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ error: "Job not found" });
        }

        if (job.universityId.toString() !== req.user._id.toString()) {
            console.log('Unauthorized: Only the creating university can delete this job');
            return res.status(403).json({ error: "Only the creating university can delete this job" });
        }

        // Remove job from university's posted jobs
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { "universityDetails.postedJobs": job._id } }
        );

        // Remove job from all students' applied jobs
        await User.updateMany(
            { "studentDetails.appliedJobs": job._id },
            { $pull: { "studentDetails.appliedJobs": job._id } }
        );

        await job.deleteOne();
        console.log('Job deleted successfully');
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ 
            error: "Failed to delete job", 
            details: error.message 
        });
    }
});

// Apply for job (student only)
router.post("/:id/apply", verifyToken, async (req, res) => {
    try {
        console.log(`Processing job application for ID: ${req.params.id}`);
        if (req.user.role !== "student") {
            console.log('Unauthorized: Only students can apply for jobs');
            return res.status(403).json({ error: "Only students can apply for jobs" });
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            console.log('Job not found');
            return res.status(404).json({ error: "Job not found" });
        }

        // Check if student has already applied
        if (req.user.studentDetails.appliedJobs.includes(job._id)) {
            console.log('Student has already applied for this job');
            return res.status(400).json({ error: "You have already applied for this job" });
        }

        // Add job to student's applied jobs
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { "studentDetails.appliedJobs": job._id } }
        );

        console.log('Job application submitted successfully');
        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error submitting job application:", error);
        res.status(500).json({ 
            error: "Failed to submit application", 
            details: error.message 
        });
    }
});

module.exports = router; 