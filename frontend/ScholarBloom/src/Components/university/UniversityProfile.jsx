import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function UniversityProfile() {
  const [university, setUniversity] = useState({
    name: '',
    email: '',
    description: '',
    location: '',
    website: '',
    logo: null
  });

  const [stats, setStats] = useState({
    totalScholarships: 0,
    activeScholarships: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalChallenges: 0,
    activeChallenges: 0,
    totalApplications: 0,
    pendingApplications: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/university/profile', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch university data');
        }

        const data = await response.json();
        setUniversity(data);
      } catch (error) {
        setError('ವಿಶ್ವವಿದ್ಯಾಲಯ ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/university/stats', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        setError('ಅಂಕಿಅಂಶಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      }
    };

    fetchUniversityData();
    fetchStats();
  }, []);

  const quickActions = [
    {
      name: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ನಿರ್ವಹಣೆ',
      href: '/university/scholarships',
      icon: AcademicCapIcon,
      description: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಅರ್ಜಿಗಳನ್ನು ವಿಮರ್ಶಿಸಿ'
    },
    {
      name: 'ಉದ್ಯೋಗ ನಿರ್ವಹಣೆ',
      href: '/university/jobs',
      icon: BriefcaseIcon,
      description: 'ಉದ್ಯೋಗ ಪೋಸ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಅರ್ಜಿಗಳನ್ನು ವಿಮರ್ಶಿಸಿ'
    },
    {
      name: 'ಸವಾಲು ನಿರ್ವಹಣೆ',
      href: '/university/challenges',
      icon: PuzzlePieceIcon,
      description: 'ಸವಾಲುಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಭಾಗವಹಿಸುವವರನ್ನು ವಿಮರ್ಶಿಸಿ'
    },
    {
      name: 'ಅರ್ಜಿ ನಿರ್ವಹಣೆ',
      href: '/university/applications',
      icon: ClipboardDocumentListIcon,
      description: 'ಎಲ್ಲಾ ಅರ್ಜಿಗಳನ್ನು ನೋಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900">ವಿಶ್ವವಿದ್ಯಾಲಯ ಪ್ರೊಫೈಲ್</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-16 w-16 text-gray-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">{university.name}</h2>
                <p className="text-gray-500">{university.email}</p>
              </div>
              <div className="ml-auto">
                <Link
                  to="/editUniprofile"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  ಪ್ರೊಫೈಲ್ ಸಂಪಾದಿಸಿ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AcademicCapIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalScholarships}</dd>
                    <dd className="text-sm text-gray-500">ಸಕ್ರಿಯ: {stats.activeScholarships}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BriefcaseIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">ಒಟ್ಟು ಉದ್ಯೋಗಗಳು</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalJobs}</dd>
                    <dd className="text-sm text-gray-500">ಸಕ್ರಿಯ: {stats.activeJobs}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <PuzzlePieceIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">ಒಟ್ಟು ಸವಾಲುಗಳು</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalChallenges}</dd>
                    <dd className="text-sm text-gray-500">ಸಕ್ರಿಯ: {stats.activeChallenges}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">ಒಟ್ಟು ಅರ್ಜಿಗಳು</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalApplications}</dd>
                    <dd className="text-sm text-gray-500">ಬಾಕಿ: {stats.pendingApplications}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">ತ್ವರಿತ ಕ್ರಿಯೆಗಳು</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <action.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{action.name}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 