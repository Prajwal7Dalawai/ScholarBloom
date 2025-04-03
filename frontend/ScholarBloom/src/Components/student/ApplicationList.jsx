import React, { useState, useEffect } from 'react';
import { applicationAPI } from '../../services/api';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        // Get user profile first to get the user ID
        const profileResponse = await fetch('http://localhost:3000/api/student/profile', {
          credentials: 'include'
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userProfile = await profileResponse.json();

        const applicationsData = await applicationAPI.getApplications({
          userId: userProfile._id,
          status: filter === 'all' ? undefined : filter
        });
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('ಅರ್ಜಿಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [filter]);

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
      {/* ಫಿಲ್ಟರ್ ಆಯ್ಕೆಗಳು */}
      <div className="flex flex-wrap gap-4">
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
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'pending'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ಬಾಕಿ ಇದೆ
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'approved'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ಅನುಮೋದಿಸಲಾಗಿದೆ
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'rejected'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ತಿರಸ್ಕರಿಸಲಾಗಿದೆ
        </button>
      </div>

      {/* ಅರ್ಜಿ ಪಟ್ಟಿ */}
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{application.title}</h3>
                <p className="text-sm text-gray-500">{application.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                application.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : application.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {application.status === 'pending'
                  ? 'ಬಾಕಿ ಇದೆ'
                  : application.status === 'approved'
                  ? 'ಅನುಮೋದಿಸಲಾಗಿದೆ'
                  : 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{application.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">ಸಲ್ಲಿಸಿದ ದಿನಾಂಕ:</span>
                <span className="font-medium">
                  {new Date(application.createdAt).toLocaleDateString('kn-IN')}
                </span>
              </div>
              {application.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-500">ಅಪ್‌ಡೇಟ್ ಮಾಡಿದ ದಿನಾಂಕ:</span>
                  <span className="font-medium">
                    {new Date(application.updatedAt).toLocaleDateString('kn-IN')}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.location.href = `/${application.type.toLowerCase()}/${application.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ಹೆಚ್ಚಿನ ವಿವರಗಳು
              </button>
              {application.status === 'rejected' && (
                <button
                  onClick={() => window.location.href = `/${application.type.toLowerCase()}/${application.id}/reapply`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  ಮರು-ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationList; 