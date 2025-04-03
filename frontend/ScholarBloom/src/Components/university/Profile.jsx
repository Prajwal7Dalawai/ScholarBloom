import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Stanford University',
    email: 'admin@stanford.edu',
    website: 'www.stanford.edu',
    location: 'Stanford, California',
    founded: '1885',
    description: 'Stanford University is one of the world\'s leading research and teaching institutions.',
    departments: [
      'Computer Science',
      'Engineering',
      'Business',
      'Medicine',
      'Law',
      'Arts & Sciences'
    ],
    stats: {
      students: 17000,
      faculty: 2200,
      alumni: 250000,
      researchFunding: '$1.8B'
    },
    achievements: [
      {
        title: 'Nobel Prize Winners',
        count: 85,
        description: 'Stanford faculty and alumni have won 85 Nobel Prizes'
      },
      {
        title: 'Research Impact',
        count: 1000,
        description: 'Over 1000 research papers published annually'
      },
      {
        title: 'Global Ranking',
        count: 2,
        description: 'Ranked #2 in the world by QS World University Rankings'
      }
    ]
  });

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

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">University Profile</h2>
            <p className="text-gray-500">Manage your university information and settings</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
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
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={profileData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.website}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.location}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Founded</label>
            {isEditing ? (
              <input
                type="text"
                name="founded"
                value={profileData.founded}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{profileData.founded}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
        {isEditing ? (
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleInputChange}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="text-gray-900">{profileData.description}</p>
        )}
      </div>

      {/* Departments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Departments</h3>
        {isEditing ? (
          <textarea
            value={profileData.departments.join(', ')}
            onChange={handleDepartmentChange}
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter departments separated by commas"
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {profileData.departments.map((dept, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {dept}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(profileData.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{value}</div>
              <div className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
          {isEditing && (
            <button
              onClick={addAchievement}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Achievement
            </button>
          )}
        </div>
        <div className="space-y-4">
          {profileData.achievements.map((achievement, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{achievement.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Count</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={achievement.count}
                      onChange={(e) => handleAchievementChange(index, 'count', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{achievement.count}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{achievement.description}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => removeAchievement(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-900"
                >
                  Remove Achievement
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile; 