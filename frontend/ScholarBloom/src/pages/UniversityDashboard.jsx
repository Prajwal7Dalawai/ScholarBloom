import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UniversityProfile from '../Components/university/UniversityProfile';
import UniversityOverview from '../Components/university/UniversityOverview';
import ManageScholarships from '../Components/university/ManageScholarships';
import ManageCourses from '../Components/university/ManageCourses';
import './UniversityDashboard.css';

const UniversityDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/university/profile', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="university-dashboard">
      <Routes>
        <Route path="/" element={<UniversityOverview />} />
        <Route path="/profile" element={<UniversityProfile />} />
        <Route path="/scholarships" element={<ManageScholarships />} />
        <Route path="/courses" element={<ManageCourses />} />
      </Routes>
    </div>
  );
};

export default UniversityDashboard;
