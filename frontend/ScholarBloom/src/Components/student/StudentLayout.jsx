import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const StudentLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/student', label: 'ಅವಲೋಕನ' },
    { path: '/student/scholarships', label: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು' },
    { path: '/student/jobs', label: 'ಉದ್ಯೋಗಗಳು' },
    { path: '/student/challenges', label: 'ಸವಾಲುಗಳು' },
    { path: '/student/applications', label: 'ಅರ್ಜಿಗಳು' },
    { path: '/student/profile', label: 'ಪ್ರೊಫೈಲ್' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side Menu */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">ScholarBloom</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 ${
                isActive(item.path) ? 'bg-gray-100 text-indigo-600 border-r-4 border-indigo-600' : ''
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout; 