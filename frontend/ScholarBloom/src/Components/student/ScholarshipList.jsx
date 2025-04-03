import React, { useState, useEffect } from 'react';
import { scholarshipAPI, applicationAPI, userAPI } from '../../services/api';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);

        // Get user profile first to get the user ID
        const userProfile = await userAPI.getUser();

        const scholarshipsData = await scholarshipAPI.getScholarships({
          status: filter === 'all' ? undefined : filter,
          sortBy: sortBy
        });

        // ಶಾಲರ್ಶಿಪ್ ಅರ್ಜಿಗಳನ್ನು ಪಡೆಯಿರಿ
        const applications = await applicationAPI.getApplications({
          userId: userProfile._id,
          type: 'scholarship'
        });

        // ಶಾಲರ್ಶಿಪ್‌ಗಳನ್ನು ಅರ್ಜಿ ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ
        const scholarshipsWithStatus = scholarshipsData.map(scholarship => ({
          ...scholarship,
          applied: applications.some(app => app.scholarshipId === scholarship.id),
          applicationStatus: applications.find(app => app.scholarshipId === scholarship.id)?.status
        }));

        setScholarships(scholarshipsWithStatus);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('ಶಾಲರ್ಶಿಪ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [filter, sortBy]);

  const handleApply = async (scholarshipId) => {
    try {
      // Get user profile first to get the user ID
      const userProfile = await userAPI.getUser();

      await applicationAPI.createApplication({
        userId: userProfile._id,
        type: 'scholarship',
        scholarshipId: scholarshipId,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // ಶಾಲರ್ಶಿಪ್ ಪಟ್ಟಿಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ
      const updatedScholarships = scholarships.map(scholarship =>
        scholarship.id === scholarshipId
          ? { ...scholarship, applied: true, applicationStatus: 'pending' }
          : scholarship
      );
      setScholarships(updatedScholarships);
    } catch (error) {
      console.error('Error applying for scholarship:', error);
      setError('ಶಾಲರ್ಶಿಪ್ ಅರ್ಜಿ ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
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
            onClick={() => setSortBy('deadline')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'deadline'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಕೊನೆಯ ದಿನಾಂಕ
          </button>
          <button
            onClick={() => setSortBy('amount')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'amount'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಮೊತ್ತ
          </button>
        </div>
      </div>

      {/* ಶಾಲರ್ಶಿಪ್ ಪಟ್ಟಿ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{scholarship.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scholarship.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {scholarship.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ಮುಚ್ಚಲಾಗಿದೆ'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{scholarship.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">ಮೊತ್ತ:</span>
                <span className="font-medium">₹{scholarship.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ಕೊನೆಯ ದಿನಾಂಕ:</span>
                <span className="font-medium">
                  {new Date(scholarship.deadline).toLocaleDateString('kn-IN')}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.location.href = `/scholarships/${scholarship.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ಹೆಚ್ಚಿನ ವಿವರಗಳು
              </button>
              {scholarship.status === 'active' && (
                <button
                  onClick={() => handleApply(scholarship.id)}
                  disabled={scholarship.applied}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    scholarship.applied
                      ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {scholarship.applied
                    ? scholarship.applicationStatus === 'pending'
                      ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ'
                      : scholarship.applicationStatus === 'approved'
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

export default ScholarshipList; 