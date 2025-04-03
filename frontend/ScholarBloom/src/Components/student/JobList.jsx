import React, { useState, useEffect } from 'react';
import { jobAPI, applicationAPI, userAPI } from '../../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('postedDate');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Get user profile first to get the user ID
        const userProfile = await userAPI.getUser();

        const jobsData = await jobAPI.getJobs({
          status: filter === 'all' ? undefined : filter,
          sortBy: sortBy
        });

        // ಉದ್ಯೋಗ ಅರ್ಜಿಗಳನ್ನು ಪಡೆಯಿರಿ
        const applications = await applicationAPI.getApplications({
          userId: userProfile._id,
          type: 'job'
        });

        // ಉದ್ಯೋಗಗಳನ್ನು ಅರ್ಜಿ ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ
        const jobsWithStatus = jobsData.map(job => ({
          ...job,
          applied: applications.some(app => app.jobId === job.id),
          applicationStatus: applications.find(app => app.jobId === job.id)?.status
        }));

        setJobs(jobsWithStatus);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('ಉದ್ಯೋಗಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filter, sortBy]);

  const handleApply = async (jobId) => {
    try {
      // Get user profile first to get the user ID
      const userProfile = await userAPI.getUser();

      await applicationAPI.createApplication({
        userId: userProfile._id,
        type: 'job',
        jobId: jobId,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // ಉದ್ಯೋಗ ಪಟ್ಟಿಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ
      const updatedJobs = jobs.map(job =>
        job.id === jobId
          ? { ...job, applied: true, applicationStatus: 'pending' }
          : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error applying for job:', error);
      setError('ಉದ್ಯೋಗ ಅರ್ಜಿ ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ಫಿಲ್ಟರ್ ಮತ್ತು ಸಾರ್ಟ್ ಆಯ್ಕೆಗಳು */}
      <div className="flex flex-wrap gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಎಲ್ಲಾ
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಸಕ್ರಿಯ
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'closed'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಮುಚ್ಚಲಾಗಿದೆ
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('postedDate')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'postedDate'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಪೋಸ್ಟ್ ದಿನಾಂಕ
          </button>
          <button
            onClick={() => setSortBy('salary')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'salary'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಸಂಬಳ
          </button>
        </div>
      </div>

      {/* ಉದ್ಯೋಗ ಪಟ್ಟಿ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                job.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {job.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ಮುಚ್ಚಲಾಗಿದೆ'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">ಸಂಬಳ:</span>
                <span className="font-medium">₹{job.salary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ಸ್ಥಳ:</span>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ಕೊನೆಯ ದಿನಾಂಕ:</span>
                <span className="font-medium">
                  {new Date(job.deadline).toLocaleDateString('kn-IN')}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.location.href = `/jobs/${job.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ಹೆಚ್ಚಿನ ವಿವರಗಳು
              </button>
              {job.status === 'active' && (
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={job.applied}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    job.applied
                      ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {job.applied
                    ? job.applicationStatus === 'pending'
                      ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ'
                      : job.applicationStatus === 'approved'
                      ? 'ಅನುಮೋದಿಸಲಾಗಿದೆ'
                      : 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'
                    : 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList; 