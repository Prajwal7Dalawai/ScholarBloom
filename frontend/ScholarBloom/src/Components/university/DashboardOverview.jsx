import React from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const DashboardOverview = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  if (!data || !data.scholarshipStats || !data.courseStats || !data.jobStats) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative">
        ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ
      </div>
    );
  }

  const { scholarshipStats, courseStats, jobStats, recentApplications = [] } = data;

  const stats = [
    {
      label: 'ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
      total: scholarshipStats.totalScholarships || 0,
      active: scholarshipStats.activeScholarships || 0,
      icon: AcademicCapIcon
    },
    {
      label: 'ಒಟ್ಟು ಉದ್ಯೋಗಗಳು',
      total: jobStats.totalJobs || 0,
      active: jobStats.activeJobs || 0,
      icon: BriefcaseIcon
    },
    {
      label: 'ಒಟ್ಟು ಕೋರ್ಸ್‌ಗಳು',
      total: courseStats.totalCourses || 0,
      active: courseStats.activeCourses || 0,
      icon: PuzzlePieceIcon
    },
    {
      label: 'ಒಟ್ಟು ಅರ್ಜಿಗಳು',
      total: (scholarshipStats.totalApplications || 0) + (jobStats.totalApplications || 0),
      pending: (scholarshipStats.pendingApplications || 0) + (jobStats.pendingApplications || 0),
      icon: ClipboardDocumentListIcon
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'scholarship':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'job':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.total}</p>
                <p className="text-sm text-gray-500">
                  {stat.active !== undefined && `ಸಕ್ರಿಯ: ${stat.active}`}
                  {stat.pending !== undefined && `ಬಾಕಿ: ${stat.pending}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      {Array.isArray(recentApplications) && recentApplications.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆಗಳು</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentApplications.map((activity, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'scholarship' ? 'bg-green-100 text-green-600' :
                      activity.type === 'job' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.scholarshipTitle || activity.jobTitle || 'ಅರ್ಜಿ'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.studentName || 'ವಿದ್ಯಾರ್ಥಿ'} - {activity.status || 'ಬಾಕಿ'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview; 