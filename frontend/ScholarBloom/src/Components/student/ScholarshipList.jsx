import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { studentService } from '../../services/studentService';

const ScholarshipList = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    fetchScholarships();
  }, [filter, sortBy]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await studentService.getScholarships({ filter, sortBy });
      setScholarships(data);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      setError(error.message || 'Error fetching scholarships. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (scholarshipId) => {
    navigate(`/student/scholarships/apply/${scholarshipId}`);
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
          onClick={fetchScholarships}
          className="mt-2 text-red-600 hover:text-red-700 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter and Sort Options */}
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
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'closed'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Closed
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('deadline')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'deadline'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Deadline
          </button>
          <button
            onClick={() => setSortBy('amount')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'amount'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Amount
          </button>
        </div>
      </div>

      {/* Scholarship List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No scholarships available at the moment.</p>
          </div>
        ) : (
          scholarships.map((scholarship) => (
            <div key={scholarship._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{scholarship.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  scholarship.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {scholarship.status === 'active' ? 'Active' : 'Closed'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  <span>Amount: ₹{scholarship.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  <span>Eligibility: {scholarship.eligibilityCriteria}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => window.location.href = `/scholarships/${scholarship._id}`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View Details
                </button>
                {scholarship.status === 'active' && (
                  <button
                    onClick={() => handleApply(scholarship._id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScholarshipList; 