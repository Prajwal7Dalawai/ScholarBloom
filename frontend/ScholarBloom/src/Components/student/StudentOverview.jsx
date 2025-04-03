import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentOverview = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetchScholarships();
    fetchJobs();
    fetchChallenges();
    fetchApplications();
  }, []);

  const fetchScholarships = async () => {
    // Implement the logic to fetch scholarships
    setScholarships([]);
  };

  const fetchJobs = async () => {
    // Implement the logic to fetch jobs
    setJobs([]);
  };

  const fetchChallenges = async () => {
    // Implement the logic to fetch challenges
    setChallenges([]);
  };

  const fetchApplications = async () => {
    // Implement the logic to fetch applications
    setApplications([]);
  };

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">{scholarships.length}</span>
            <span className="ml-2 text-sm font-medium text-gray-500">ಒಟ್ಟು</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">ಉದ್ಯೋಗಗಳು</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">{jobs.length}</span>
            <span className="ml-2 text-sm font-medium text-gray-500">ಒಟ್ಟು</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">ಸವಾಲುಗಳು</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">{challenges.length}</span>
            <span className="ml-2 text-sm font-medium text-gray-500">ಒಟ್ಟು</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">ಅರ್ಜಿಗಳು</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">{applications.length}</span>
            <span className="ml-2 text-sm font-medium text-gray-500">ಒಟ್ಟು</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು</h2>
        <div className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-gray-500">ಯಾವುದೇ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳಿಲ್ಲ</p>
          ) : (
            applications.map((application, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{application.title}</p>
                  <p className="text-sm text-gray-500">{application.status}</p>
                </div>
                <span className="text-sm text-gray-500">{application.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentOverview; 