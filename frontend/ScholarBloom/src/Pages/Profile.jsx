import React from 'react';
import { useAuth } from '../hooks/useAuth';
import defaultImage from '../assets/defaultImage.png';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container profile-container">
      <div className="card profile-card">
        <div className="profile-img-section text-center">
          <img src={user.profilePic || defaultImage} alt="Profile" className="profile-img" />
        </div>

        <div className="profile-details text-center">
          <h2 className="text-primary">{user.fullName}</h2>
          <p className="text-light">{user.email}</p>
          {user.role === 'student' && (
            <>
              <p className="text-light"><strong>Grades:</strong> {user.studentDetails?.grade || 'N/A'}</p>
              <p className="text-light"><strong>Skills:</strong> {user.studentDetails?.skills?.join(', ') || 'N/A'}</p>
              <p className="text-light"><strong>EduCoins:</strong> {user.studentDetails?.eduCoins || 0}</p>
            </>
          )}
          {user.role === 'university' && (
            <>
              <p className="text-light"><strong>Location:</strong> {user.location?.city}, {user.location?.state}, {user.location?.country}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 