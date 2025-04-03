import React, { useState, useEffect } from 'react';
import UniversitySidebar from './UniversitySidebar';
import DashboardOverview from './DashboardOverview';
import ScholarshipManagement from './ScholarshipManagement';
import JobManagement from './JobManagement';
import ChallengeManagement from './ChallengeManagement';
import Profile from './Profile';

const UniversityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          credentials: 'include'
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'scholarships':
        return <ScholarshipManagement />;
      case 'jobs':
        return <JobManagement />;
      case 'challenges':
        return <ChallengeManagement />;
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <UniversitySidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome back, {userData?.fullName || 'University Admin'}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-50 px-4 py-2 rounded-full">
                      <span className="text-indigo-700 font-medium">Active Scholarships: 5</span>
                    </div>
                  </div>
                </div>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard; 