const Scholarship = require("../models/scholarship-schema");
const Course = require("../models/course-schema");
const Job = require("../models/job-schema");
const User = require("../models/user-schema");
const Contact = require("../models/contact-schema");

// Public Scholarship Controllers
module.exports.getPublicScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({ status: "active" })
            .populate("universityId", "fullName profilePic");
        return res.status(200).json(scholarships);
    } catch (error) {
        console.error("Get Public Scholarships Error:", error);
        return res.status(500).json({ error: "Failed to get scholarships" });
    }
};

module.exports.getPublicScholarshipDetails = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOne({ 
            _id: req.params.id,
            status: "active"
        }).populate("universityId", "fullName profilePic location");
        
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json(scholarship);
    } catch (error) {
        console.error("Get Public Scholarship Details Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship details" });
    }
};

// Public Course Controllers
module.exports.getPublicCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "active" })
            .populate("universityId", "fullName profilePic");
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Get Public Courses Error:", error);
        return res.status(500).json({ error: "Failed to get courses" });
    }
};

module.exports.getPublicCourseDetails = async (req, res) => {
    try {
        const course = await Course.findOne({ 
            _id: req.params.id,
            status: "active"
        }).populate("universityId", "fullName profilePic location");
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("Get Public Course Details Error:", error);
        return res.status(500).json({ error: "Failed to get course details" });
    }
};

// Public Job Controllers
module.exports.getPublicJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: "active" })
            .populate("universityId", "fullName profilePic");
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Get Public Jobs Error:", error);
        return res.status(500).json({ error: "Failed to get jobs" });
    }
};

module.exports.getPublicJobDetails = async (req, res) => {
    try {
        const job = await Job.findOne({ 
            _id: req.params.id,
            status: "active"
        }).populate("universityId", "fullName profilePic location");
        
        if (!job) {
            return res.status(404).json({ error: "Job posting not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error("Get Public Job Details Error:", error);
        return res.status(500).json({ error: "Failed to get job details" });
    }
};

// Public University Controllers
module.exports.getPublicUniversities = async (req, res) => {
    try {
        const universities = await User.find({ role: "university" })
            .select("fullName profilePic location universityDetails");
        return res.status(200).json(universities);
    } catch (error) {
        console.error("Get Public Universities Error:", error);
        return res.status(500).json({ error: "Failed to get universities" });
    }
};

module.exports.getPublicUniversityDetails = async (req, res) => {
    try {
        const university = await User.findOne({ 
            _id: req.params.id,
            role: "university"
        }).select("fullName profilePic location universityDetails");
        
        if (!university) {
            return res.status(404).json({ error: "University not found" });
        }
        return res.status(200).json(university);
    } catch (error) {
        console.error("Get Public University Details Error:", error);
        return res.status(500).json({ error: "Failed to get university details" });
    }
};

// Contact Form Controller
module.exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });
        return res.status(201).json({ 
            message: "Contact form submitted successfully",
            contact
        });
    } catch (error) {
        console.error("Submit Contact Form Error:", error);
        return res.status(500).json({ error: "Failed to submit contact form" });
    }
}; 