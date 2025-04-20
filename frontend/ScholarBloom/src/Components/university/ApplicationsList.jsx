import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { applicationAPI } from '../../services/api';

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        // Get university profile first to get the university ID
        const profileResponse = await fetch(`${import.meta.env.VITE_API_URL}/university/profile`, {
          credentials: 'include'
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch university profile');
        }

        const universityProfile = await profileResponse.json();

        // Fetch applications for this university
        const applicationsData = await applicationAPI.getApplications({
          universityId: universityProfile._id,
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationAPI.updateApplication(id, { status: newStatus });
      setApplications(applications.map(application =>
        application.id === id ? { ...application, status: newStatus } : application
      ));
    } catch (err) {
      setError('ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const filteredApplications = filter === 'all'
    ? applications
    : applications.filter(app => app.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-gray-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">ಅರ್ಜಿಗಳ ಪಟ್ಟಿ</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಎಲ್ಲಾ
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'pending'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಬಾಕಿಯಿರುವ
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'accepted'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಸ್ವೀಕೃತ
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === 'rejected'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ತಿರಸ್ಕೃತ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <li key={application.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {application.title}
                        </h3>
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }">
                          {application.status === 'accepted' ? 'ಸ್ವೀಕೃತ' :
                           application.status === 'rejected' ? 'ತಿರಸ್ಕೃತ' : 'ಬಾಕಿಯಿರುವ'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(application.id, 'accepted')}
                              className="text-green-400 hover:text-green-500"
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(application.id, 'rejected')}
                              className="text-red-400 hover:text-red-500"
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {application.type === 'scholarship' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ' :
                           application.type === 'job' ? 'ಉದ್ಯೋಗ' : 'ಸವಾಲು'}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ದಿನಾಂಕ: {new Date(application.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          ಹೆಸರು: {application.applicant.name}
                        </p>
                        <p className="ml-4">
                          ಇಮೇಲ್: {application.applicant.email}
                        </p>
                        <p className="ml-4">
                          ಫೋನ್: {application.applicant.phone}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">ಸಲ್ಲಿಕೆಗಳು:</h4>
                      <ul className="mt-2 space-y-1">
                        {application.documents.map((doc, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            • {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 