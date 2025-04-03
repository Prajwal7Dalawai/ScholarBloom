const User = require("../models/user-schema");
const Scholarship = require("../models/scholarship-schema");
const Course = require("../models/course-schema");

// Profile Controllers
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            location: user.location,
            studentDetails: user.studentDetails
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
            req.user.uid,
            { fullName, profilePic },
            { new: true }
        );
        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ error: "Failed to update profile" });
    }
};

module.exports.updateAcademicDetails = async (req, res) => {
    try {
        const { grade, skills } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.uid,
            { "studentDetails.grade": grade, "studentDetails.skills": skills },
            { new: true }
        );
        return res.status(200).json({ message: "Academic details updated successfully", user });
    } catch (error) {
        console.error("Update Academic Details Error:", error);
        return res.status(500).json({ error: "Failed to update academic details" });
    }
};

// EduCoins Controllers
module.exports.getEduCoins = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid);
        return res.status(200).json({ eduCoins: user.studentDetails.eduCoins });
    } catch (error) {
        console.error("Get EduCoins Error:", error);
        return res.status(500).json({ error: "Failed to get EduCoins" });
    }
};

module.exports.earnEduCoins = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.uid,
            { $inc: { "studentDetails.eduCoins": amount } },
            { new: true }
        );
        return res.status(200).json({ 
            message: "EduCoins earned successfully", 
            currentBalance: user.studentDetails.eduCoins 
        });
    } catch (error) {
        console.error("Earn EduCoins Error:", error);
        return res.status(500).json({ error: "Failed to earn EduCoins" });
    }
};

module.exports.spendEduCoins = async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.uid);
        
        if (user.studentDetails.eduCoins < amount) {
            return res.status(400).json({ error: "Insufficient EduCoins" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.uid,
            { $inc: { "studentDetails.eduCoins": -amount } },
            { new: true }
        );

        return res.status(200).json({ 
            message: "EduCoins spent successfully", 
            currentBalance: updatedUser.studentDetails.eduCoins 
        });
    } catch (error) {
        console.error("Spend EduCoins Error:", error);
        return res.status(500).json({ error: "Failed to spend EduCoins" });
    }
};

// Scholarship Controllers
module.exports.getAvailableScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find({ status: "active" });
        return res.status(200).json(scholarships);
    } catch (error) {
        console.error("Get Scholarships Error:", error);
        return res.status(500).json({ error: "Failed to get scholarships" });
    }
};

module.exports.applyForScholarship = async (req, res) => {
    try {
        const { id } = req.params;
        const scholarship = await Scholarship.findById(id);
        
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.uid,
            { $addToSet: { "studentDetails.appliedScholarships": id } },
            { new: true }
        );

        return res.status(200).json({ 
            message: "Scholarship application submitted successfully",
            appliedScholarships: user.studentDetails.appliedScholarships
        });
    } catch (error) {
        console.error("Apply Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to apply for scholarship" });
    }
};

module.exports.getScholarshipApplications = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid)
            .populate("studentDetails.appliedScholarships");
        
        return res.status(200).json(user.studentDetails.appliedScholarships);
    } catch (error) {
        console.error("Get Scholarship Applications Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship applications" });
    }
};

// Course Controllers
module.exports.getAvailableCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "active" });
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Get Courses Error:", error);
        return res.status(500).json({ error: "Failed to get courses" });
    }
};

module.exports.enrollInCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.uid,
            { $addToSet: { "studentDetails.enrolledCourses": id } },
            { new: true }
        );

        return res.status(200).json({ 
            message: "Enrolled in course successfully",
            enrolledCourses: user.studentDetails.enrolledCourses
        });
    } catch (error) {
        console.error("Enroll Course Error:", error);
        return res.status(500).json({ error: "Failed to enroll in course" });
    }
};

module.exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.uid)
            .populate("studentDetails.enrolledCourses");
        
        return res.status(200).json(user.studentDetails.enrolledCourses);
    } catch (error) {
        console.error("Get Enrolled Courses Error:", error);
        return res.status(500).json({ error: "Failed to get enrolled courses" });
    }
};

module.exports.updateCourseProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress } = req.body;

        const user = await User.findOneAndUpdate(
            { 
                _id: req.user.uid,
                "studentDetails.enrolledCourses": id
            },
            { $set: { "studentDetails.courseProgress.$[elem].progress": progress } },
            { 
                new: true,
                arrayFilters: [{ "elem.courseId": id }]
            }
        );

        return res.status(200).json({ 
            message: "Course progress updated successfully",
            courseProgress: user.studentDetails.courseProgress
        });
    } catch (error) {
        console.error("Update Course Progress Error:", error);
        return res.status(500).json({ error: "Failed to update course progress" });
    }
}; 