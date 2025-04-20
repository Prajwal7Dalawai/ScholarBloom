import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, [token]);

  const fetchProfileData = async () => {
    try {
      console.log('Fetching profile data with token:', token);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/university/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Profile fetch error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch profile data');
      }

      const data = await response.json();
      console.log('Received profile data:', data);
      setProfileData(data);
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError(err.message);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/university/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          email: profileData.email,
          location: profileData.location,
          profilePic: profileData.profilePic
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartmentChange = (e) => {
    const departments = e.target.value.split(',').map(dept => dept.trim());
    setProfileData(prev => ({
      ...prev,
      departments
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    const newAchievements = [...profileData.achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: value
    };
    setProfileData(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    setProfileData(prev => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          title: '',
          count: '',
          description: ''
        }
      ]
    }));
  };

  const removeAchievement = (index) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center p-4">
        No profile data found
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">University Profile</h2>
            <p className="text-gray-500">Manage your university information and settings</p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">University Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={profileData.fullName || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="location.city"
                  placeholder="City"
                  value={profileData.location?.city || ''}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
                />
                <input
                  type="text"
                  name="location.state"
                  placeholder="State"
                  value={profileData.location?.state || ''}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    location: { ...prev.location, state: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
                />
                <input
                  type="text"
                  name="location.country"
                  placeholder="Country"
                  value={profileData.location?.country || ''}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    location: { ...prev.location, country: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
                />
              </div>
            ) : (
              <p className="mt-1 text-gray-900">
                {[
                  profileData.location?.city,
                  profileData.location?.state,
                  profileData.location?.country
                ].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            {isEditing ? (
              <input
                type="text"
                name="profilePic"
                value={profileData.profilePic || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black"
              />
            ) : (
              <div className="mt-1">
                {profileData.profilePic ? (
                  <img
                    src={profileData.profilePic}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No profile picture set</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">
              {profileData.universityDetails?.scholarshipsOffered?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Scholarships Offered</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">
              {profileData.universityDetails?.postedJobs?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Jobs Posted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 