import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { jobAPI } from '../../services/api';

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('postedAt');

  useEffect(() => {
    fetchJobs();
  }, [filter, sortBy]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await jobAPI.getJobs({ filter, sortBy });
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError(error.message || 'Error fetching jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId) => {
    navigate(`/student/jobs/apply/${jobId}`);
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
        <button
          onClick={fetchJobs}
          className="mt-2 text-red-600 hover:text-red-700 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Jobs</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="postedAt">Posted Date</option>
          <option value="deadline">Deadline</option>
          <option value="jobTitle">Title</option>
        </select>
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No jobs available at the moment.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'open'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {job.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.jobDescription}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => handleApply(job._id)}
                disabled={job.status === 'closed'}
                className={`w-full px-4 py-2 rounded ${
                  job.status === 'open'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {job.status === 'open' ? 'Apply Now' : 'Applications Closed'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList; 