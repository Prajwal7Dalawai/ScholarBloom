import React, { useState, useEffect } from 'react';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

const ChallengeManagement = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('startDate');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/api/university/challenges', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('ಸವಾಲುಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleCreateChallenge = () => {
    // TODO: Implement challenge creation
  };

  const handleEditChallenge = (id) => {
    // TODO: Implement challenge editing
  };

  const handleDeleteChallenge = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/university/challenges/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete challenge');
      }

      setChallenges(prev => prev.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting challenge:', error);
      setError('ಸವಾಲನ್ನು ಅಳಿಸಲು ವಿಫಲವಾಗಿದೆ');
    }
  };

  const filteredChallenges = challenges
    .filter(challenge => {
      if (filter === 'all') return true;
      return challenge.status === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'startDate':
          return new Date(b.startDate) - new Date(a.startDate);
        case 'endDate':
          return new Date(b.endDate) - new Date(a.endDate);
        case 'participants':
          return b.participants.length - a.participants.length;
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
            <h2 className="text-2xl font-bold text-gray-900">ಸವಾಲು ನಿರ್ವಹಣೆ</h2>
            <p className="text-gray-500">ಸವಾಲುಗಳನ್ನು ರಚಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ</p>
          </div>
          <button
            onClick={handleCreateChallenge}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            ಹೊಸ ಸವಾಲು
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
              <option value="startDate">ಪ್ರಾರಂಭ ದಿನಾಂಕ</option>
              <option value="endDate">ಕೊನೆಯ ದಿನಾಂಕ</option>
              <option value="participants">ಭಾಗವಹಿಸುವವರು</option>
            </select>
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಶೀರ್ಷಿಕೆ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಪ್ರಾರಂಭ ದಿನಾಂಕ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಕೊನೆಯ ದಿನಾಂಕ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಸ್ಥಿತಿ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಭಾಗವಹಿಸುವವರು</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ಕ್ರಿಯೆಗಳು</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredChallenges.map((challenge) => (
              <tr key={challenge._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                  <div className="text-sm text-gray-500">{challenge.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(challenge.startDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {challenge.participants.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditChallenge(challenge._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    ಸಂಪಾದಿಸು
                  </button>
                  <button
                    onClick={() => handleDeleteChallenge(challenge._id)}
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

export default ChallengeManagement; 