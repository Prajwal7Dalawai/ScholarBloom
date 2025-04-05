import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './StudentProfile.css';
import { UserIcon } from '@heroicons/react/24/outline';

const StudentProfile = () => {
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
    resume: null,
    profilePicture: null
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }

        // Set initial profile data from user info if not already set
        if (!profile.name && user) {
          setProfile(prev => ({
            ...prev,
            name: user.fullName || '',
            email: user.email || '',
            profilePicture: user.profilePic || null
          }));
          if (user.profilePic) {
            setPreviewImage(user.profilePic);
          }
        }

        const response = await fetch('http://localhost:3000/api/student/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        // Merge the additional profile data with basic user info
        const processedData = {
          ...data,
          name: user?.fullName || data.name || '',
          email: user?.email || data.email || '',
          profilePicture: user?.profilePic || data.profilePicture || null,
          education: {
            currentDegree: '',
            institution: '',
            yearOfStudy: '',
            expectedGraduation: '',
            gpa: '',
            ...(data.education || {})
          },
          skills: data.skills || [],
          interests: data.interests || [],
          achievements: data.achievements || []
        };
        
        setProfile(processedData);
        if (processedData.profilePicture && !previewImage) {
          setPreviewImage(processedData.profilePicture);
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError('Failed to load additional profile data. Basic information is still available.');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch profile data when component mounts or when token/user changes
    if (!editMode) {
      fetchProfile();
    }
  }, [token, navigate, user]); // Remove editMode from dependencies

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] || {}), // Ensure the parent object exists
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

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setProfile(prev => ({
      ...prev,
      skills: skills.filter(skill => skill !== '') // Filter out empty strings
    }));
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setProfile(prev => ({
      ...prev,
      interests: interests.filter(interest => interest !== '') // Filter out empty strings
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setProfile(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (key === 'skills' || key === 'interests') {
          formData.append(key, JSON.stringify(profile[key]));
        } else if (key === 'profilePicture' && profile[key] instanceof File) {
          formData.append('profilePicture', profile[key]);
        } else {
          formData.append(key, profile[key]);
        }
      });

      const response = await fetch('http://localhost:3000/api/student/profile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setError(null);
    setSuccess(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setError(null);
    setSuccess(false);
    // No need to refetch here, just reset the form
    const savedProfile = { ...profile };
    setProfile(savedProfile);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center mb-6">
          <UserIcon className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="success-message" role="alert">
            <span>Profile updated successfully</span>
          </div>
        )}

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="profile-container">
            <div className="profile-content">
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  {previewImage ? (
                    <img 
                      src={previewImage}
                      alt="Profile" 
                      className="profile-picture"
                    />
                  ) : (
                    <div className="profile-picture-placeholder">
                      <UserIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-picture-input"
                  />
                )}
              </div>

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your address"
                  />
                </div>

                <div className="form-group">
                  <label>Current Degree</label>
                  <input
                    type="text"
                    name="education.currentDegree"
                    value={profile.education?.currentDegree || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your current degree"
                  />
                </div>

                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="education.institution"
                    value={profile.education?.institution || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your institution"
                  />
                </div>

                <div className="form-group">
                  <label>Year of Study</label>
                  <input
                    type="text"
                    name="education.yearOfStudy"
                    value={profile.education?.yearOfStudy || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your year of study"
                  />
                </div>

                <div className="form-group">
                  <label>Expected Graduation</label>
                  <input
                    type="text"
                    name="education.expectedGraduation"
                    value={profile.education?.expectedGraduation || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your expected graduation date"
                  />
                </div>

                <div className="form-group">
                  <label>GPA</label>
                  <input
                    type="text"
                    name="education.gpa"
                    value={profile.education?.gpa || ''}
                    onChange={handleChange}
                    disabled={!editMode}
                    placeholder="Enter your GPA"
                  />
                </div>

                <div className="form-group">
                  <label>Skills</label>
                  <input
                    type="text"
                    value={(profile.skills || []).join(', ')}
                    onChange={handleSkillsChange}
                    disabled={!editMode}
                    placeholder="Enter skills (comma-separated)"
                  />
                </div>

                <div className="form-group">
                  <label>Interests</label>
                  <input
                    type="text"
                    value={(profile.interests || []).join(', ')}
                    onChange={handleInterestsChange}
                    disabled={!editMode}
                    placeholder="Enter interests (comma-separated)"
                  />
                </div>

                <div className="form-actions">
                  {!editMode ? (
                    <button
                      type="button"
                      onClick={handleEditClick}
                      className="edit-button"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={saving}
                        className="save-button"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile; 