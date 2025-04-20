import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import ScholarshipList from './ScholarshipList';
import JobList from './JobList';
import ChallengeList from './ChallengeList';
import ApplicationList from './ApplicationList';
import Profile from './Profile';
import { scholarshipAPI, jobAPI, challengeAPI, applicationAPI } from '../../services/api';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    scholarships: 0,
    jobs: 0,
    challenges: 0,
    applications: 0
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const applications = await applicationAPI.getApplications({
          userId: userData?._id
        });
        const submissions = await challengeAPI.getSubmissions({
          userId: userData?._id
        });

        setStats({
          scholarships: applications.filter(app => app.type === 'scholarship').length,
          jobs: applications.filter(app => app.type === 'job').length,
          challenges: submissions.length,
          applications: applications.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (userData) {
      fetchStats();
    }
  }, [userData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'scholarships':
        return <ScholarshipList />;
      case 'jobs':
        return <JobList />;
      case 'challenges':
        return <ChallengeList />;
      case 'applications':
        return <ApplicationList />;
      case 'profile':
        return <Profile />;
      default:
        return <DashboardOverview />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ಟ್ಯಾಬ್ ನ್ಯಾವಿಗೇಶನ್ */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ಅವಲೋಕನ
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scholarships'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ಉದ್ಯೋಗಗಳು
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'challenges'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ಸವಾಲುಗಳು
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ಅರ್ಜಿಗಳು
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ಪ್ರೊಫೈಲ್
            </button>
          </div>
        </div>
      </div>

      {/* ಮುಖ್ಯ ವಿಷಯ */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard; 