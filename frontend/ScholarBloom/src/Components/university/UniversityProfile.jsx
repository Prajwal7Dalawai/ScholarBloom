import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import './UniversityProfile.css';

const UniversityProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    description: '',
    website: '',
    contactNumber: '',
    establishedYear: '',
    accreditation: '',
    facilities: '',
    achievements: ''
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

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/university/profile`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            location: data.location || '',
            description: data.description || '',
            website: data.website || '',
            contactNumber: data.contactNumber || '',
            establishedYear: data.establishedYear || '',
            accreditation: data.accreditation || '',
            facilities: data.facilities || '',
            achievements: data.achievements || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
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

    fetchProfile();
    fetchStats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/university/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

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
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>University Profile</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>University Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Established Year</label>
            <input
              type="number"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Accreditation</label>
            <input
              type="text"
              name="accreditation"
              value={formData.accreditation}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Facilities</label>
            <textarea
              name="facilities"
              value={formData.facilities}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Achievements</label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleInputChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">Save Changes</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-section">
            <h2>Basic Information</h2>
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Location:</strong> {profile?.location}</p>
            <p><strong>Description:</strong> {profile?.description}</p>
          </div>

          <div className="profile-section">
            <h2>Contact Information</h2>
            <p><strong>Website:</strong> {profile?.website}</p>
            <p><strong>Contact Number:</strong> {profile?.contactNumber}</p>
          </div>

          <div className="profile-section">
            <h2>University Details</h2>
            <p><strong>Established Year:</strong> {profile?.establishedYear}</p>
            <p><strong>Accreditation:</strong> {profile?.accreditation}</p>
          </div>

          <div className="profile-section">
            <h2>Facilities</h2>
            <p>{profile?.facilities}</p>
          </div>

          <div className="profile-section">
            <h2>Achievements</h2>
            <p>{profile?.achievements}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
};

export default UniversityProfile; 