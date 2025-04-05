import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentProfile from '../Components/student/StudentProfile';
import StudentOverview from '../Components/student/StudentOverview';
import AIRecommendations from '../Components/student/AIRecommendations';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <Routes>
        <Route path="/" element={<StudentOverview />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
      </Routes>
    </div>
  );
};

export default StudentDashboard;
