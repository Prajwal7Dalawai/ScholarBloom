import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import Person from '../assets/person.png';
import { studentService } from '../services/studentService';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, scholarshipsData, coursesData, applicationsData] = await Promise.all([
          studentService.getProfile(),
          studentService.getScholarships(),
          studentService.getEnrolledCourses(),
          studentService.getApplications()
        ]);

        setProfile(profileData);
        setScholarships(scholarshipsData);
        setCourses(coursesData);
        setApplications(applicationsData);
      } catch (error) {
        toast.error(error.message || 'ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApplyScholarship = async (scholarshipId) => {
    try {
      await studentService.applyScholarship(scholarshipId, {
        studentId: profile._id,
        status: 'pending'
      });
      toast.success('ಶಿಷ್ಯವೃತ್ತಿಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ');
      // Refresh applications
      const updatedApplications = await studentService.getApplications();
      setApplications(updatedApplications);
    } catch (error) {
      toast.error(error.message || 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ವಿಫಲವಾಗಿದೆ');
    }
  };

  const handleEnrollCourse = async (courseId) => {
    try {
      await studentService.enrollCourse(courseId);
      toast.success('ಕೋರ್ಸ್‌ಗೆ ನೋಂದಾಯಿಸಲಾಗಿದೆ');
      // Refresh courses
      const updatedCourses = await studentService.getEnrolledCourses();
      setCourses(updatedCourses);
    } catch (error) {
      toast.error(error.message || 'ಕೋರ್ಸ್ ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ');
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
        <h2 className="text-2xl font-bold mb-4">ಪ್ರೊಫೈಲ್</h2>
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">ಹೆಸರು:</p>
              <p className="font-semibold">{profile.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">ಇಮೇಲ್:</p>
              <p className="font-semibold">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-600">ವಿದ್ಯಾರ್ಥಿ ID:</p>
              <p className="font-semibold">{profile.studentId}</p>
            </div>
            <div>
              <p className="text-gray-600">ವಿಭಾಗ:</p>
              <p className="font-semibold">{profile.department}</p>
            </div>
          </div>
        )}
      </div>

      {/* Scholarships Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">ಲಭ್ಯವಿರುವ ಶಿಷ್ಯವೃತ್ತಿಗಳು</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((scholarship) => (
            <div key={scholarship._id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{scholarship.title}</h3>
              <p className="text-gray-600 mb-2">{scholarship.description}</p>
              <p className="text-gray-600 mb-2">ಮೊತ್ತ: ₹{scholarship.amount}</p>
              <button
                onClick={() => handleApplyScholarship(scholarship._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">ನೋಂದಾಯಿತ ಕೋರ್ಸ್‌ಗಳು</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="text-gray-600 mb-2">ಅವಧಿ: {course.duration}</p>
              <button
                onClick={() => handleEnrollCourse(course._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                ಕೋರ್ಸ್ ಪ್ರಾರಂಭಿಸಿ
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">ನನ್ನ ಅರ್ಜಿಗಳು</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">ಶಿಷ್ಯವೃತ್ತಿ</th>
                <th className="px-6 py-3 text-left">ಸ್ಥಿತಿ</th>
                <th className="px-6 py-3 text-left">ಸಲ್ಲಿಕೆ ದಿನಾಂಕ</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application._id} className="border-b">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
