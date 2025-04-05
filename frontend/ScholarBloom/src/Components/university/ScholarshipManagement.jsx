import React, { useState, useEffect } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

const ScholarshipManagement = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/api/university/scholarships', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch scholarships');
        }

        const data = await response.json();
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleCreateScholarship = () => {
    // TODO: Implement scholarship creation
  };

  const handleEditScholarship = (id) => {
    // TODO: Implement scholarship editing
  };

  const handleDeleteScholarship = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/university/scholarships/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete scholarship');
      }

      setScholarships(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      setError('ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ');
    }
  };

  const filteredScholarships = scholarships
    .filter(scholarship => {
      if (filter === 'all') return true;
      return scholarship.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'amount':
          return b.amount - a.amount;
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
            <h2 className="text-2xl font-bold text-gray-900">ವಿದ್ಯಾರ್ಥಿವೇತನ ನಿರ್ವಹಣೆ</h2>
            <p className="text-gray-500">ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ</p>
          </div>
          <button
            onClick={handleCreateScholarship}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            ಹೊಸ ವಿದ್ಯಾರ್ಥಿವೇತನ
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
              <option value="deadline">ಕೊನೆಯ ದಿನಾಂಕ</option>
              <option value="amount">ಮೊತ್ತ</option>
              <option value="applicants">ಅರ್ಜಿದಾರರು</option>
            </select>
          </div>
        </div>
      </div>

      {/* Scholarship List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಶೀರ್ಷಿಕೆ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಮೊತ್ತ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಕೊನೆಯ ದಿನಾಂಕ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಸ್ಥಿತಿ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಅರ್ಜಿದಾರರು</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಕ್ರಿಯೆಗಳು</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredScholarships.map((scholarship) => (
              <tr key={scholarship._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{scholarship.title}</div>
                  <div className="text-sm text-gray-500">{scholarship.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{scholarship.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    scholarship.status === 'active' ? 'bg-green-100 text-green-800' :
                    scholarship.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {scholarship.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scholarship.applicants.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditScholarship(scholarship._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ಸಂಪಾದಿಸು
                  </button>
                  <button
                    onClick={() => handleDeleteScholarship(scholarship._id)}
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

export default ScholarshipManagement; 