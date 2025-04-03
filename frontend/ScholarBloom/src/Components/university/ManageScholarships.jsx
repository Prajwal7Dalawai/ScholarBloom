import React, { useState, useEffect } from 'react';
import {
  AcademicCapIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { scholarshipAPI } from '../../services/api';

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        // Get university profile first to get the university ID
        const profileResponse = await fetch('http://localhost:3000/api/university/profile', {
          credentials: 'include'
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch university profile');
        }

        const universityProfile = await profileResponse.json();
        const scholarshipsData = await scholarshipAPI.getScholarships({ universityId: universityProfile._id });
        setScholarships(scholarshipsData);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await scholarshipAPI.updateScholarship(id, { status: newStatus });
      setScholarships(scholarships.map(scholarship =>
        scholarship.id === id ? { ...scholarship, status: newStatus } : scholarship
      ));
    } catch (err) {
      setError('ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('ನೀವು ಖಚಿತವಾಗಿ ಈ ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        await scholarshipAPI.deleteScholarship(id);
        setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
      } catch (err) {
        setError('ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      }
    }
  };

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
            <AcademicCapIcon className="h-8 w-8 text-gray-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ನಿರ್ವಹಿಸಿ</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            ಹೊಸ ವಿದ್ಯಾರ್ಥಿವೇತನ
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {scholarships.map((scholarship) => (
                <li key={scholarship.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                          {scholarship.title}
                        </h3>
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          scholarship.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {scholarship.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ನಿಷ್ಕ್ರಿಯ'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setEditingScholarship(scholarship)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(scholarship.id, scholarship.status === 'active' ? 'inactive' : 'active')}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          {scholarship.status === 'active' ? (
                            <XCircleIcon className="h-5 w-5" />
                          ) : (
                            <CheckCircleIcon className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(scholarship.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {scholarship.description}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <span className="font-medium">{scholarship.amount}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          ಕೊನೆಯ ದಿನಾಂಕ: {new Date(scholarship.deadline).toLocaleDateString()}
                        </p>
                        <p className="ml-4">
                          ಅರ್ಜಿದಾರರು: {scholarship.applicants}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">ಅಗತ್ಯಗಳು:</h4>
                      <ul className="mt-2 space-y-1">
                        {scholarship.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            • {req}
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