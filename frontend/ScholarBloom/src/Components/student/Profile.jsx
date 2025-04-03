import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
    interests: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await userAPI.getUser(currentUser.uid);
        setProfile(profileData);
        setFormData({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          education: profileData.education || '',
          skills: profileData.skills || '',
          interests: profileData.interests || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('ಪ್ರೊಫೈಲ್ ಅನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

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
      await userAPI.updateUser(currentUser.uid, formData);
      setProfile(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('ಪ್ರೊಫೈಲ್ ಅನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">ಪ್ರೊಫೈಲ್</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              ಸಂಪಾದಿಸಿ
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">ಹೆಸರು</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ಇಮೇಲ್</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ಫೋನ್</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ವಿಳಾಸ</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ಶಿಕ್ಷಣ</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ಕೌಶಲ್ಯಗಳು</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="ಕೌಶಲ್ಯಗಳನ್ನು ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿ"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ಆಸಕ್ತಿಗಳು</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="ಆಸಕ್ತಿಗಳನ್ನು ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿ"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                ರದ್ದುಮಾಡಿ
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
              >
                ಉಳಿಸಿ
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">ಹೆಸರು</h3>
              <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ಇಮೇಲ್</h3>
              <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ಫೋನ್</h3>
              <p className="mt-1 text-sm text-gray-900">{profile.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ವಿಳಾಸ</h3>
              <p className="mt-1 text-sm text-gray-900">{profile.address}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ಶಿಕ್ಷಣ</h3>
              <p className="mt-1 text-sm text-gray-900">{profile.education}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ಕೌಶಲ್ಯಗಳು</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.skills?.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">ಆಸಕ್ತಿಗಳು</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests?.split(',').map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 