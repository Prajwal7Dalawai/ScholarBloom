const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the university that posted the job
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    applicants: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // Reference to students applying
                required: true,
            },
            resumeLink: {
                type: String, // URL to resume
                required: true,
            },
            status: {
                type: String,
                enum: ["Pending", "Accepted", "Rejected"],
                default: "Pending",
            },
            appliedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    postedAt: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date, // Application deadline
        required: true,
    }
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
module.exports = JobApplication;
