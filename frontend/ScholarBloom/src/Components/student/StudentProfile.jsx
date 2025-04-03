import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  StarIcon,
  BookOpenIcon,
  TrophyIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: {
      currentDegree: '',
      institution: '',
      yearOfStudy: '',
      expectedGraduation: '',
      gpa: ''
    },
    skills: [],
    achievements: [],
    interests: [],
    resume: null
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/student/profile', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError('ಪ್ರೊಫೈಲ್ ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
    } catch (error) {
      setError('ಪ್ರೊಫೈಲ್ ಅನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    } finally {
      setSaving(false);
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
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center">
          <UserIcon className="h-8 w-8 text-gray-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ</h3>
                  <p className="mt-1 text-sm text-gray-500">ನಿಮ್ಮ ಮೂಲ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ</p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      ಹೆಸರು
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      ಇಮೇಲ್
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      ಫೋನ್ ಸಂಖ್ಯೆ
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      ವಿಳಾಸ
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="address"
                        id="address"
                        rows={3}
                        value={profile.address}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿ</h3>
                  <p className="mt-1 text-sm text-gray-500">ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ</p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="education.currentDegree" className="block text-sm font-medium text-gray-700">
                      ಪ್ರಸ್ತುತ ಪದವಿ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="education.currentDegree"
                        id="education.currentDegree"
                        value={profile.education.currentDegree}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="education.institution" className="block text-sm font-medium text-gray-700">
                      ಸಂಸ್ಥೆ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="education.institution"
                        id="education.institution"
                        value={profile.education.institution}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="education.yearOfStudy" className="block text-sm font-medium text-gray-700">
                      ಅಧ್ಯಯನ ವರ್ಷ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="education.yearOfStudy"
                        id="education.yearOfStudy"
                        value={profile.education.yearOfStudy}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="education.expectedGraduation" className="block text-sm font-medium text-gray-700">
                      ನಿರೀಕ್ಷಿತ ಪದವಿ ವರ್ಷ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="education.expectedGraduation"
                        id="education.expectedGraduation"
                        value={profile.education.expectedGraduation}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="education.gpa" className="block text-sm font-medium text-gray-700">
                      GPA
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="education.gpa"
                        id="education.gpa"
                        value={profile.education.gpa}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {saving ? 'ನವೀಕರಿಸುತ್ತಿದೆ...' : 'ನವೀಕರಿಸಿ'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 