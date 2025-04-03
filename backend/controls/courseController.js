const Course = require("../models/course-schema");

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        console.error("Get All Courses Error:", error);
        return res.status(500).json({ error: "Failed to get courses" });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    try {
        const course = new Course({
            ...req.body,
            universityId: req.user.uid
        });
        await course.save();
        return res.status(201).json(course);
    } catch (error) {
        console.error("Create Course Error:", error);
        return res.status(500).json({ error: "Failed to create course" });
    }
};

// Get course details
const getCourseDetails = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        console.error("Get Course Details Error:", error);
        return res.status(500).json({ error: "Failed to get course details" });
    }
};

// Update course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to update this course" });
        }
        Object.assign(course, req.body);
        await course.save();
        return res.status(200).json(course);
    } catch (error) {
        console.error("Update Course Error:", error);
        return res.status(500).json({ error: "Failed to update course" });
    }
};

// Delete course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to delete this course" });
        }
        await course.deleteOne();
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Delete Course Error:", error);
        return res.status(500).json({ error: "Failed to delete course" });
    }
};

// Enroll in course
const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.enrolledStudents.includes(req.user.uid)) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }
        course.enrolledStudents.push(req.user.uid);
        await course.save();
        return res.status(200).json(course);
    } catch (error) {
        console.error("Enroll in Course Error:", error);
        return res.status(500).json({ error: "Failed to enroll in course" });
    }
};

// Get course enrollments
const getCourseEnrollments = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to view enrollments" });
        }
        return res.status(200).json(course.enrolledStudents);
    } catch (error) {
        console.error("Get Course Enrollments Error:", error);
        return res.status(500).json({ error: "Failed to get course enrollments" });
    }
};

// Update enrollment status
const updateEnrollmentStatus = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.universityId !== req.user.uid) {
            return res.status(403).json({ error: "Not authorized to update enrollment status" });
        }
        const { enrollmentId } = req.params;
        const { status } = req.body;
        // Update enrollment status logic here
        return res.status(200).json({ message: "Enrollment status updated successfully" });
    } catch (error) {
        console.error("Update Enrollment Status Error:", error);
        return res.status(500).json({ error: "Failed to update enrollment status" });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    getCourseDetails,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    getCourseEnrollments,
    updateEnrollmentStatus
}; 