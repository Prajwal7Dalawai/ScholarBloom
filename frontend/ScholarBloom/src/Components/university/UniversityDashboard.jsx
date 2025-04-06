import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UniversitySidebar from './UniversitySidebar';
import DashboardOverview from './DashboardOverview';
import { Outlet, useLocation } from 'react-router-dom';

const UniversityDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          console.error('No token available');
          setError('Authentication token not found. Please login again.');
          setLoading(false);
          return;
        }

        if (!user || !user._id) {
          console.error('No user data or user ID available');
          setError('User data not found. Please login again.');
          setLoading(false);
          return;
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch recent applications first as a test
        try {
          const applicationsResponse = await fetch('http://localhost:3000/api/university/scholarships/applications?limit=5', {
            method: 'GET',
            headers
          });

          if (!applicationsResponse.ok) {
            const errorText = await applicationsResponse.text();
            console.error('Applications response error:', {
              status: applicationsResponse.status,
              statusText: applicationsResponse.statusText,
              body: errorText
            });
            throw new Error(`Failed to fetch applications: ${errorText}`);
          }

          const recentApplications = await applicationsResponse.json();
          console.log('Recent applications:', recentApplications);

          // Continue with other API calls...
          const [scholarshipAnalytics, courseAnalytics, jobAnalytics] = await Promise.all([
            fetch('http://localhost:3000/api/university/analytics/scholarships', {
              method: 'GET',
              headers
            }).then(async res => {
              if (!res.ok) {
                console.error('Scholarship analytics response:', res.status, await res.text());
                throw new Error('Failed to fetch scholarship analytics');
              }
              return res.json();
            }),
            fetch('http://localhost:3000/api/university/analytics/courses', {
              method: 'GET',
              headers
            }).then(async res => {
              if (!res.ok) {
                console.error('Course analytics response:', res.status, await res.text());
                throw new Error('Failed to fetch course analytics');
              }
              return res.json();
            }),
            fetch('http://localhost:3000/api/university/analytics/jobs', {
              method: 'GET',
              headers
            }).then(async res => {
              if (!res.ok) {
                console.error('Job analytics response:', res.status, await res.text());
                throw new Error('Failed to fetch job analytics');
              }
              return res.json();
            })
          ]);

          // Initialize default values for analytics
          const defaultAnalytics = {
            totalScholarships: 0,
            activeScholarships: 0,
            totalApplications: 0,
            pendingApplications: 0
          };

          setDashboardData({
            scholarshipStats: scholarshipAnalytics || defaultAnalytics,
            courseStats: courseAnalytics || { totalCourses: 0, activeCourses: 0, totalEnrollments: 0 },
            jobStats: jobAnalytics || { totalJobs: 0, activeJobs: 0, totalApplications: 0, pendingApplications: 0 },
            recentApplications: Array.isArray(recentApplications?.applications) ? recentApplications.applications : []
          });

        } catch (error) {
          console.error('Detailed error:', error);
          setError(error.message || 'Failed to fetch dashboard data');
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to fetch dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchDashboardData();
    }
  }, [user, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const isOverview = location.pathname === '/university';

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <UniversitySidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Welcome, {user?.fullName || 'University Administrator'}
                  </h1>
                  {dashboardData?.scholarshipStats && (
                    <div className="flex items-center space-x-4">
                      <div className="bg-indigo-50 px-4 py-2 rounded-full">
                        <span className="text-indigo-700 font-medium">
                          Active Scholarships: {dashboardData.scholarshipStats.activeScholarships}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    {error}
                  </div>
                )}
                {isOverview ? (
                  <DashboardOverview data={dashboardData} loading={loading} error={error} />
                ) : (
                  <Outlet />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard; 