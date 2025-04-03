import React, { useState, useEffect } from 'react';
import { scholarshipAPI, jobAPI, challengeAPI, applicationAPI } from '../../services/api';
import { studentService } from '../../services/studentService';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    scholarships: 0,
    jobs: 0,
    challenges: 0,
    applications: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get user profile using studentService
        const userProfile = await studentService.getProfile();

        // ಅರ್ಜಿಗಳನ್ನು ಪಡೆಯಿರಿ
        const applications = await applicationAPI.getApplications({
          userId: userProfile._id,
          limit: 3
        });

        // ಸವಾಲು ಸಲ್ಲಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ
        const submissions = await challengeAPI.getSubmissions({
          userId: userProfile._id,
          limit: 3
        });

        // ಸಂಖ್ಯೆಗಳನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ
        setStats({
          scholarships: applications.filter(app => app.type === 'scholarship').length,
          jobs: applications.filter(app => app.type === 'job').length,
          challenges: submissions.length,
          applications: applications.length
        });

        // ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳನ್ನು ಸಂಯೋಜಿಸಿ
        const activities = [
          ...applications.map(app => ({
            type: app.type,
            title: app.title,
            description: `${app.type === 'scholarship' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ' : 'ಉದ್ಯೋಗ'} ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ`,
            timestamp: app.createdAt
          })),
          ...submissions.map(sub => ({
            type: 'challenge',
            title: sub.title,
            description: 'ಸವಾಲು ಸಲ್ಲಿಸಲಾಗಿದೆ',
            timestamp: sub.createdAt
          }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
         .slice(0, 5);

        setRecentActivities(activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಡೇಟಾವನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
      {/* ಸಂಖ್ಯೆಗಳು */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.scholarships}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">ಉದ್ಯೋಗಗಳು</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.jobs}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">ಸವಾಲುಗಳು</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.challenges}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">ಅರ್ಜಿಗಳು</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.applications}</p>
        </div>
      </div>

      {/* ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'scholarship'
                  ? 'bg-green-100 text-green-600'
                  : activity.type === 'job'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {activity.type === 'scholarship' ? 'ವಿ' : activity.type === 'job' ? 'ಉ' : 'ಸ'}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleDateString('kn-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 