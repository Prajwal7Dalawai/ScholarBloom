import React, { useState, useEffect } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('postedAt');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/api/university/jobs', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('ಉದ್ಯೋಗಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleCreateJob = () => {
    // TODO: Implement job creation
  };

  const handleEditJob = (id) => {
    // TODO: Implement job editing
  };

  const handleDeleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/university/jobs/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('ಉದ್ಯೋಗವನ್ನು ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ');
    }
  };

  const filteredJobs = jobs
    .filter(job => {
      if (filter === 'all') return true;
      return job.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'postedAt':
          return new Date(b.postedAt) - new Date(a.postedAt);
        case 'salary':
          return b.salary - a.salary;
        case 'applicants':
          return b.applicants.length - a.applicants.length;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ಉದ್ಯೋಗ ನಿರ್ವಹಣೆ</h2>
            <p className="text-gray-500">ಉದ್ಯೋಗ ಪೋಸ್ಟಿಂಗ್‌ಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ</p>
          </div>
          <button
            onClick={handleCreateJob}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            ಹೊಸ ಉದ್ಯೋಗ
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು</option>
              <option value="active">ಸಕ್ರಿಯ</option>
              <option value="inactive">ನಿಷ್ಕ್ರಿಯ</option>
              <option value="draft">ಕರಡು</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">ವಿಂಗಡಿಸು:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="postedAt">ಪೋಸ್ಟ್ ಮಾಡಿದ ದಿನಾಂಕ</option>
              <option value="salary">ಸಂಬಳ</option>
              <option value="applicants">ಅರ್ಜಿದಾರರು</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಶೀರ್ಷಿಕೆ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಸಂಬಳ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಪೋಸ್ಟ್ ಮಾಡಿದ ದಿನಾಂಕ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಸ್ಥಿತಿ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಅರ್ಜಿದಾರರು</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಕ್ರಿಯೆಗಳು</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{job.salary.toLocaleString()}/year</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    job.status === 'active' ? 'bg-green-100 text-green-800' :
                    job.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.applicants.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditJob(job._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ಸಂಪಾದಿಸು
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    ಅಳಿಸು
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobManagement; 