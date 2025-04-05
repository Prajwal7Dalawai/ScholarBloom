import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AcademicCapIcon, BriefcaseIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/student', label: 'Overview' },
    { path: '/student/scholarships', label: 'Scholarships' },
    { path: '/student/jobs', label: 'Jobs' },
    { path: '/student/challenges', label: 'Challenges' },
    { path: '/student/applications', label: 'Applications' },
    { path: '/student/profile', label: 'Profile' },
  ];

  const actionButtons = [
    {
      label: 'Apply for Scholarships',
      icon: AcademicCapIcon,
      onClick: () => navigate('/student/scholarships'),
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      label: 'Apply for Jobs',
      icon: BriefcaseIcon,
      onClick: () => navigate('/student/jobs'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Play Challenges',
      icon: PuzzlePieceIcon,
      onClick: () => navigate('/student/challenges'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side Menu */}
      <div className="w-64 bg-white shadow-md mr-8">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">ScholarBloom</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-4 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 ${
                isActive(item.path) ? 'bg-gray-100 text-indigo-600 border-r-4 border-indigo-600' : ''
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Action Buttons */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionButtons.map((button) => (
            <button
              key={button.label}
              onClick={button.onClick}
              className={`flex items-center justify-center space-x-2 ${button.color} text-white px-6 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <button.icon className="h-6 w-6" />
              <span>{button.label}</span>
            </button>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout; 