const User = require("../models/user-schema");
const Scholarship = require("../models/scholarship-schema");
const Course = require("../models/course-schema");
const Job = require("../models/job-schema");

// Profile Controllers
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "University not found" });
        }
        return res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            location: user.location,
            universityDetails: user.universityDetails
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({ error: "Failed to get profile" });
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const { fullName, profilePic } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { fullName, profilePic },
            { new: true }
        );
        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ error: "Failed to update profile" });
    }
};

module.exports.updateUniversityDetails = async (req, res) => {
    try {
        const { description, website, accreditation, ranking } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { 
                "universityDetails.description": description,
                "universityDetails.website": website,
                "universityDetails.accreditation": accreditation,
                "universityDetails.ranking": ranking
            },
            { new: true }
        );
        return res.status(200).json({ message: "University details updated successfully", user });
    } catch (error) {
        console.error("Update University Details Error:", error);
        return res.status(500).json({ error: "Failed to update university details" });
    }
};

// Scholarship Management Controllers
module.exports.createScholarship = async (req, res) => {
    try {
        const scholarshipData = {
            ...req.body,
            universityId: req.user._id
        };
        const scholarship = await Scholarship.create(scholarshipData);
        return res.status(201).json({ message: "Scholarship created successfully", scholarship });
    } catch (error) {
        console.error("Create Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to create scholarship" });
    }
};

module.exports.getScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({ universityId: req.user._id });
        return res.status(200).json(scholarships);
    } catch (error) {
        console.error("Get Scholarships Error:", error);
        return res.status(500).json({ error: "Failed to get scholarships" });
    }
};

module.exports.getScholarshipDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the ID is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid scholarship ID format" });
        }

        const scholarship = await Scholarship.findOne({
            _id: id,
            universityId: req.user._id
        });
        
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json(scholarship);
    } catch (error) {
        console.error("Get Scholarship Details Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship details" });
    }
};

module.exports.updateScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOneAndUpdate(
            { _id: req.params.id, universityId: req.user._id },
            req.body,
            { new: true }
        );
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json({ message: "Scholarship updated successfully", scholarship });
    } catch (error) {
        console.error("Update Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to update scholarship" });
    }
};

module.exports.deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOneAndDelete({
            _id: req.params.id,
            universityId: req.user._id
        });
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json({ message: "Scholarship deleted successfully" });
    } catch (error) {
        console.error("Delete Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to delete scholarship" });
    }
};

module.exports.getScholarshipApplications = async (req, res) => {
    try {
        const scholarship = await Scholarship.findOne({
            _id: req.params.id,
            universityId: req.user._id
        }).populate({
            path: "applicants.studentId",
            select: "fullName email studentDetails"
        });
        
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json(scholarship.applicants);
    } catch (error) {
        console.error("Get Scholarship Applications Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship applications" });
    }
};

module.exports.updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        
        const scholarship = await Scholarship.findOneAndUpdate(
            { 
                _id: req.params.id,
                universityId: req.user._id,
                "applicants._id": applicationId
            },
            { $set: { "applicants.$.status": status } },
            { new: true }
        );
        
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship or application not found" });
        }
        return res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
        console.error("Update Application Status Error:", error);
        return res.status(500).json({ error: "Failed to update application status" });
    }
};

// Course Management Controllers
module.exports.createCourse = async (req, res) => {
    try {
        const courseData = {
            ...req.body,
            universityId: req.user._id
        };
        const course = await Course.create(courseData);
        return res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.error("Create Course Error:", error);
        return res.status(500).json({ error: "Failed to create course" });
    }
};

module.exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ universityId: req.user._id });
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Get Courses Error:", error);
        return res.status(500).json({ error: "Failed to get courses" });
    }
};

module.exports.getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            universityId: req.user._id
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("Get Course Details Error:", error);
        return res.status(500).json({ error: "Failed to get course details" });
    }
};

module.exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.params.id, universityId: req.user._id },
            req.body,
            { new: true }
        );
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        console.error("Update Course Error:", error);
        return res.status(500).json({ error: "Failed to update course" });
    }
};

module.exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({
            _id: req.params.id,
            universityId: req.user._id
        });
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Delete Course Error:", error);
        return res.status(500).json({ error: "Failed to delete course" });
    }
};

module.exports.getCourseEnrollments = async (req, res) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id,
            universityId: req.user._id
        }).populate("enrolledStudents");
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json(course.enrolledStudents);
    } catch (error) {
        console.error("Get Course Enrollments Error:", error);
        return res.status(500).json({ error: "Failed to get course enrollments" });
    }
};

// Job Posting Controllers
module.exports.createJobPosting = async (req, res) => {
    try {
        const jobData = {
            ...req.body,
            universityId: req.user._id
        };
        const job = await Job.create(jobData);
        return res.status(201).json({ message: "Job posting created successfully", job });
    } catch (error) {
        console.error("Create Job Posting Error:", error);
        return res.status(500).json({ error: "Failed to create job posting" });
    }
};

module.exports.getJobPostings = async (req, res) => {
    try {
        const jobs = await Job.find({ universityId: req.user._id });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Get Job Postings Error:", error);
        return res.status(500).json({ error: "Failed to get job postings" });
    }
};

module.exports.getJobDetails = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            universityId: req.user._id
        });
        if (!job) {
            return res.status(404).json({ error: "Job posting not found" });
        }
        return res.status(200).json(job);
    } catch (error) {
        console.error("Get Job Details Error:", error);
        return res.status(500).json({ error: "Failed to get job details" });
    }
};

module.exports.updateJobPosting = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.params.id, universityId: req.user._id },
            req.body,
            { new: true }
        );
        if (!job) {
            return res.status(404).json({ error: "Job posting not found" });
        }
        return res.status(200).json({ message: "Job posting updated successfully", job });
    } catch (error) {
        console.error("Update Job Posting Error:", error);
        return res.status(500).json({ error: "Failed to update job posting" });
    }
};

module.exports.deleteJobPosting = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            universityId: req.user._id
        });
        if (!job) {
            return res.status(404).json({ error: "Job posting not found" });
        }
        return res.status(200).json({ message: "Job posting deleted successfully" });
    } catch (error) {
        console.error("Delete Job Posting Error:", error);
        return res.status(500).json({ error: "Failed to delete job posting" });
    }
};

module.exports.getJobApplications = async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.params.id,
            universityId: req.user._id
        }).populate("applications.studentId");
        
        if (!job) {
            return res.status(404).json({ error: "Job posting not found" });
        }
        return res.status(200).json(job.applications);
    } catch (error) {
        console.error("Get Job Applications Error:", error);
        return res.status(500).json({ error: "Failed to get job applications" });
    }
};

module.exports.updateJobApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        
        const job = await Job.findOneAndUpdate(
            { 
                _id: req.params.id,
                universityId: req.user._id,
                "applications._id": applicationId
            },
            { $set: { "applications.$.status": status } },
            { new: true }
        );
        
        if (!job) {
            return res.status(404).json({ error: "Job posting or application not found" });
        }
        return res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
        console.error("Update Job Application Status Error:", error);
        return res.status(500).json({ error: "Failed to update application status" });
    }
};

// Analytics Controllers
module.exports.getScholarshipAnalytics = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({ universityId: req.user._id });
        const analytics = {
            totalScholarships: scholarships.length,
            activeScholarships: scholarships.filter(s => s.status === 'active').length,
            totalApplications: scholarships.reduce((acc, s) => acc + (s.applicants ? s.applicants.length : 0), 0),
            pendingApplications: scholarships.reduce((acc, s) => 
                acc + (s.applicants ? s.applicants.filter(a => a.status === 'pending').length : 0), 0),
            approvedApplications: scholarships.reduce((acc, s) => 
                acc + (s.applicants ? s.applicants.filter(a => a.status === 'approved').length : 0), 0)
        };
        return res.status(200).json(analytics);
    } catch (error) {
        console.error("Get Scholarship Analytics Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship analytics" });
    }
};

module.exports.getCourseAnalytics = async (req, res) => {
    try {
        const courses = await Course.find({ universityId: req.user._id });
        const analytics = {
            totalCourses: courses.length,
            activeCourses: courses.filter(c => c.status === 'active').length,
            totalEnrollments: courses.reduce((acc, c) => acc + (c.enrolledStudents ? c.enrolledStudents.length : 0), 0)
        };
        return res.status(200).json(analytics);
    } catch (error) {
        console.error("Get Course Analytics Error:", error);
        return res.status(500).json({ error: "Failed to get course analytics" });
    }
};

module.exports.getJobAnalytics = async (req, res) => {
    try {
        const jobs = await Job.find({ universityId: req.user._id });
        const analytics = {
            totalJobs: jobs.length,
            activeJobs: jobs.filter(j => j.status === 'active').length,
            totalApplications: jobs.reduce((acc, j) => acc + (j.applications ? j.applications.length : 0), 0),
            pendingApplications: jobs.reduce((acc, j) => 
                acc + (j.applications ? j.applications.filter(a => a.status === 'pending').length : 0), 0),
            approvedApplications: jobs.reduce((acc, j) => 
                acc + (j.applications ? j.applications.filter(a => a.status === 'approved').length : 0), 0)
        };
        return res.status(200).json(analytics);
    } catch (error) {
        console.error("Get Job Analytics Error:", error);
        return res.status(500).json({ error: "Failed to get job analytics" });
    }
};

// Get all applications (scholarships, courses, and jobs)
module.exports.getAllApplications = async (req, res) => {
    try {
        console.log("Request headers:", req.headers);
        console.log("Request user object:", req.user);
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { limit } = req.query;
        console.log("Requested limit:", limit);
        
        // Get all scholarships with populated applicants
        const scholarships = await Scholarship.find({ universityId: req.user._id })
            .populate({
                path: 'applicants.studentId',
                select: 'fullName email studentDetails profilePic'
            });
            
        console.log("Found scholarships:", scholarships.length); // Debug log
        
        // Get all jobs with populated applications
        const jobs = await Job.find({ universityId: req.user._id })
            .populate({
                path: 'applications.studentId',
                select: 'fullName email studentDetails profilePic'
            });
            
        console.log("Found jobs:", jobs.length); // Debug log

        // Extract all applications from scholarships
        let allApplications = [];
        
        // Process scholarship applications
        for (const scholarship of scholarships) {
            if (scholarship.applicants && scholarship.applicants.length > 0) {
                const applications = scholarship.applicants.map(applicant => ({
                    type: 'scholarship',
                    itemId: scholarship._id,
                    title: scholarship.title,
                    studentId: applicant.studentId?._id,
                    studentName: applicant.studentId?.fullName || 'Unknown',
                    studentEmail: applicant.studentId?.email || 'Unknown',
                    studentProfilePic: applicant.studentId?.profilePic,
                    studentGrade: applicant.studentId?.studentDetails?.grade || 'N/A',
                    status: applicant.status || 'pending',
                    createdAt: applicant.appliedAt || applicant.createdAt || new Date(),
                    eduCoins: applicant.eduCoins || 0
                }));
                allApplications = [...allApplications, ...applications];
            }
        }
        
        // Process job applications
        for (const job of jobs) {
            if (job.applications && job.applications.length > 0) {
                const applications = job.applications.map(application => ({
                    type: 'job',
                    itemId: job._id,
                    title: job.title,
                    studentId: application.studentId?._id,
                    studentName: application.studentId?.fullName || 'Unknown',
                    studentEmail: application.studentId?.email || 'Unknown',
                    studentProfilePic: application.studentId?.profilePic,
                    studentGrade: application.studentId?.studentDetails?.grade || 'N/A',
                    status: application.status || 'pending',
                    createdAt: application.appliedAt || application.createdAt || new Date()
                }));
                allApplications = [...allApplications, ...applications];
            }
        }
        
        console.log("Total applications found:", allApplications.length); // Debug log
        
        // Sort all applications by date (newest first)
        allApplications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Apply limit if provided
        if (limit) {
            allApplications = allApplications.slice(0, parseInt(limit));
            console.log("Applications after limit:", allApplications.length); // Debug log
        }
        
        return res.status(200).json({
            total: allApplications.length,
            applications: allApplications
        });
    } catch (error) {
        console.error("Get All Applications Error - Full error:", error);
        console.error("Error stack trace:", error.stack);
        return res.status(500).json({ 
            error: "Failed to get applications",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 