import React, { useState, useEffect } from 'react';
import { universityService } from '../services/universityService';
import { toast } from 'react-toastify';
import './UniversityDashboard.css'; // Using the same CSS as Student Dashboard
import UniversityIcon from '../assets/harvard-university.avif'; // Default university image
import ScholarshipModal from '../components/modals/ScholarshipModal';
import CourseModal from '../components/modals/CourseModal';
import JobModal from '../components/modals/JobModal';

const UniversityDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [scholarships, setScholarships] = useState([]);
    const [courses, setCourses] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    profileData,
                    scholarshipsData,
                    coursesData,
                    jobsData,
                    applicationsData,
                    analyticsData
                ] = await Promise.all([
                    universityService.getProfile(),
                    universityService.getScholarships(),
                    universityService.getCourses(),
                    universityService.getJobs(),
                    universityService.getApplications(),
                    universityService.getAnalytics()
                ]);

                setProfile(profileData);
                setScholarships(scholarshipsData);
                setCourses(coursesData);
                setJobs(jobsData);
                setApplications(applicationsData);
                setAnalytics(analyticsData);
            } catch (error) {
                toast.error(error.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateScholarship = async (scholarshipData) => {
        try {
            await universityService.createScholarship(scholarshipData);
            toast.success('Scholarship created successfully');
            setIsScholarshipModalOpen(false);
            // Refresh scholarships
            const updatedScholarships = await universityService.getScholarships();
            setScholarships(updatedScholarships);
        } catch (error) {
            toast.error(error.message || 'Failed to create scholarship');
        }
    };

    const handleUpdateScholarship = async (scholarshipData) => {
        try {
            await universityService.updateScholarship(selectedScholarship._id, scholarshipData);
            toast.success('Scholarship updated successfully');
            setIsScholarshipModalOpen(false);
            setSelectedScholarship(null);
            // Refresh scholarships
            const updatedScholarships = await universityService.getScholarships();
            setScholarships(updatedScholarships);
        } catch (error) {
            toast.error(error.message || 'Failed to update scholarship');
        }
    };

    const handleDeleteScholarship = async (scholarshipId) => {
        if (window.confirm('Are you sure you want to delete this scholarship?')) {
            try {
                await universityService.deleteScholarship(scholarshipId);
                toast.success('Scholarship deleted successfully');
                // Refresh scholarships
                const updatedScholarships = await universityService.getScholarships();
                setScholarships(updatedScholarships);
            } catch (error) {
                toast.error(error.message || 'Failed to delete scholarship');
            }
        }
    };

    const handleCreateCourse = async (courseData) => {
        try {
            await universityService.createCourse(courseData);
            toast.success('Course created successfully');
            setIsCourseModalOpen(false);
            // Refresh courses
            const updatedCourses = await universityService.getCourses();
            setCourses(updatedCourses);
        } catch (error) {
            toast.error(error.message || 'Failed to create course');
        }
    };

    const handleUpdateCourse = async (courseData) => {
        try {
            await universityService.updateCourse(selectedCourse._id, courseData);
            toast.success('Course updated successfully');
            setIsCourseModalOpen(false);
            setSelectedCourse(null);
            // Refresh courses
            const updatedCourses = await universityService.getCourses();
            setCourses(updatedCourses);
        } catch (error) {
            toast.error(error.message || 'Failed to update course');
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await universityService.deleteCourse(courseId);
                toast.success('Course deleted successfully');
                // Refresh courses
                const updatedCourses = await universityService.getCourses();
                setCourses(updatedCourses);
            } catch (error) {
                toast.error(error.message || 'Failed to delete course');
            }
        }
    };

    const handleCreateJob = async (jobData) => {
        try {
            await universityService.createJob(jobData);
            toast.success('Job posting created successfully');
            setIsJobModalOpen(false);
            // Refresh jobs
            const updatedJobs = await universityService.getJobs();
            setJobs(updatedJobs);
        } catch (error) {
            toast.error(error.message || 'Failed to create job posting');
        }
    };

    const handleUpdateJob = async (jobData) => {
        try {
            await universityService.updateJob(selectedJob._id, jobData);
            toast.success('Job posting updated successfully');
            setIsJobModalOpen(false);
            setSelectedJob(null);
            // Refresh jobs
            const updatedJobs = await universityService.getJobs();
            setJobs(updatedJobs);
        } catch (error) {
            toast.error(error.message || 'Failed to update job posting');
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await universityService.deleteJob(jobId);
                toast.success('Job posting deleted successfully');
                // Refresh jobs
                const updatedJobs = await universityService.getJobs();
                setJobs(updatedJobs);
            } catch (error) {
                toast.error(error.message || 'Failed to delete job posting');
            }
        }
    };

    const handleUpdateApplicationStatus = async (applicationId, status) => {
        try {
            await universityService.updateApplicationStatus(applicationId, status);
            toast.success('Application status updated successfully');
            // Refresh applications
            const updatedApplications = await universityService.getApplications();
            setApplications(updatedApplications);
        } catch (error) {
            toast.error(error.message || 'Failed to update application status');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                {profile && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Name:</p>
                            <p className="font-semibold">{profile.fullName}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email:</p>
                            <p className="font-semibold">{profile.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Location:</p>
                            <p className="font-semibold">{profile.location}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Details:</p>
                            <p className="font-semibold">{profile.universityDetails}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Analytics Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-800">Total Scholarships</h3>
                            <p className="text-2xl font-bold text-blue-600">{analytics.totalScholarships}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-800">Total Courses</h3>
                            <p className="text-2xl font-bold text-green-600">{analytics.totalCourses}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-purple-800">Total Applications</h3>
                            <p className="text-2xl font-bold text-purple-600">{analytics.totalApplications}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Scholarships Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Scholarships</h2>
                    <button
                        onClick={() => {
                            setSelectedScholarship(null);
                            setIsScholarshipModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        New Scholarship
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {scholarships.map((scholarship) => (
                        <div key={scholarship._id} className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">{scholarship.title}</h3>
                            <p className="text-gray-600 mb-2">{scholarship.description}</p>
                            <p className="text-gray-600 mb-2">Amount: ₹{scholarship.amount}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        setSelectedScholarship(scholarship);
                                        setIsScholarshipModalOpen(true);
                                    }}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteScholarship(scholarship._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Courses</h2>
                    <button
                        onClick={() => {
                            setSelectedCourse(null);
                            setIsCourseModalOpen(true);
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        New Course
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course._id} className="border rounded-lg p-4">
                            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                            <p className="text-gray-600 mb-2">{course.description}</p>
                            <p className="text-gray-600 mb-2">Duration: {course.duration} months</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setIsCourseModalOpen(true);
                                    }}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteCourse(course._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Applications Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Applications</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left">Student</th>
                                <th className="px-6 py-3 text-left">Scholarship</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Submission Date</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application._id} className="border-b">
                                    <td className="px-6 py-4">{application.student.fullName}</td>
                                    <td className="px-6 py-4">{application.scholarship.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded ${
                                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(application.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {application.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleUpdateApplicationStatus(application._id, 'approved')}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateApplicationStatus(application._id, 'rejected')}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <ScholarshipModal
                isOpen={isScholarshipModalOpen}
                onClose={() => {
                    setIsScholarshipModalOpen(false);
                    setSelectedScholarship(null);
                }}
                scholarship={selectedScholarship}
                onSubmit={selectedScholarship ? handleUpdateScholarship : handleCreateScholarship}
            />

            <CourseModal
                isOpen={isCourseModalOpen}
                onClose={() => {
                    setIsCourseModalOpen(false);
                    setSelectedCourse(null);
                }}
                course={selectedCourse}
                onSubmit={selectedCourse ? handleUpdateCourse : handleCreateCourse}
            />

            <JobModal
                isOpen={isJobModalOpen}
                onClose={() => {
                    setIsJobModalOpen(false);
                    setSelectedJob(null);
                }}
                job={selectedJob}
                onSubmit={selectedJob ? handleUpdateJob : handleCreateJob}
            />
        </div>
    );
};

export default UniversityDashboard;
