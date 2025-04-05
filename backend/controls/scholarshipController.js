require("dotenv").config();
const Scholarship = require("../models/scholarship-schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user-schema.js");

// Create scholarship
const createScholarship = async (req, res) => {
    try {
        const scholarship = new Scholarship({
            ...req.body,
            universityId: req.user.uid
        });
        await scholarship.save();
        return res.status(201).json(scholarship);
    } catch (error) {
        console.error("Create Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to create scholarship" });
    }
};

// List scholarships
const listScholarships = async (req, res) => {
    try {
        const currUser = res.locals.currUser;
        const user = await Scholarship.find({ name: currUser.name });
        res.status(200).json({ scholarships: user.scholarships });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all scholarships
const getAllScholarships = async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        return res.status(200).json(scholarships);
    } catch (error) {
        console.error("Get All Scholarships Error:", error);
        return res.status(500).json({ error: "Failed to get scholarships" });
    }
};

// List selected scholarships
const listSelectedScholarships = async (req, res) => {
    try {
        const currUser = res.locals.currUser;
        const user = await Scholarship.find({ name: currUser.name });
        res.status(200).json({ scholarships: user.selectedScholarships });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get scholarship applicants
const getScholarshipApplicants = async (req, res) => {
    try {
        const currUser = res.locals.currUser;
        const user = await Scholarship.find({ name: currUser.name });
        res.status(200).json({ applicants: user.applicants });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Apply for scholarship
const applyForScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }

        // Check if student has already applied
        const alreadyApplied = scholarship.applicants.some(app => 
            app.studentId.toString() === req.user._id.toString()
        );

        if (alreadyApplied) {
            return res.status(400).json({ error: "Already applied for this scholarship" });
        }

        // Get student details
        const student = await User.findById(req.user._id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Add application
        scholarship.applicants.push({
            studentId: req.user._id,
            status: "pending",
            grade: student.studentDetails?.grade,
            eduCoins: student.studentDetails?.eduCoins
        });

        await scholarship.save();

        // Add scholarship to student's applied list
        await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { "studentDetails.appliedScholarships": scholarship._id } }
        );

        return res.status(200).json({ 
            message: "Application submitted successfully",
            scholarshipId: scholarship._id
        });
    } catch (error) {
        console.error("Apply for Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to apply for scholarship" });
    }
};

// Get applied scholarships
const getAppliedScholarships = async (req, res) => {
    try {
        const user = await User.findById(res.locals.currentUser.email);
        const scholarships = user.StudentDetails.appliedScholarships;
        const appliedScholarships = await Promise.all(scholarships.map(schId => Scholarship.findById(schId)));
        res.status(200).json({ appliedScholarships });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Accept student
const acceptStudent = async (req, res) => {
    try {
        const user = await User.findById(res.locals.currentUser.email);
        const { scholarshipId, studentId } = req.body;
        const scholarship = await Scholarship.findOne({ _id: scholarshipId, applicants: { $elemMatch: studentId } });
        scholarship.applicants.forEach(applicant => {
            if (applicant.studentId == studentId) {
                applicant.status = "awarded";
            }
        });
        await scholarship.save();
        return res.status(200).json({ message: "Student accepted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get scholarship details
const getScholarshipDetails = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        return res.status(200).json(scholarship);
    } catch (error) {
        console.error("Get Scholarship Details Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship details" });
    }
};

// Update scholarship
const updateScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        if (scholarship.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to update this scholarship" });
        }
        Object.assign(scholarship, req.body);
        await scholarship.save();
        return res.status(200).json(scholarship);
    } catch (error) {
        console.error("Update Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to update scholarship" });
    }
};

// Delete scholarship
const deleteScholarship = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        if (scholarship.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to delete this scholarship" });
        }
        await scholarship.deleteOne();
        return res.status(200).json({ message: "Scholarship deleted successfully" });
    } catch (error) {
        console.error("Delete Scholarship Error:", error);
        return res.status(500).json({ error: "Failed to delete scholarship" });
    }
};

// Get scholarship applications
const getScholarshipApplications = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        if (scholarship.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to view applications" });
        }
        return res.status(200).json(scholarship.applicants);
    } catch (error) {
        console.error("Get Scholarship Applications Error:", error);
        return res.status(500).json({ error: "Failed to get scholarship applications" });
    }
};

// Update scholarship application status
const updateScholarshipApplicationStatus = async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) {
            return res.status(404).json({ error: "Scholarship not found" });
        }
        if (scholarship.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to update application status" });
        }
        const { applicationId } = req.params;
        const { status } = req.body;
        // Update application status logic here
        return res.status(200).json({ message: "Application status updated successfully" });
    } catch (error) {
        console.error("Update Scholarship Application Status Error:", error);
        return res.status(500).json({ error: "Failed to update application status" });
    }
};

module.exports = {
    getAllScholarships,
    createScholarship,
    getScholarshipDetails,
    updateScholarship,
    deleteScholarship,
    applyForScholarship,
    getScholarshipApplications,
    updateScholarshipApplicationStatus,
    listScholarships,
    listSelectedScholarships,
    getScholarshipApplicants,
    getAppliedScholarships,
    acceptStudent
};
