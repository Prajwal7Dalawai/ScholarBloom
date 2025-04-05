import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const isStudent = location.pathname.startsWith('/student');
  const isUniversity = location.pathname.startsWith('/university');
  const isAdmin = location.pathname.startsWith('/admin');

  const studentNavItems = [
    { name: 'Overview', href: '/student', icon: HomeIcon },
    { name: 'Scholarships', href: '/student/scholarships', icon: AcademicCapIcon },
    { name: 'Jobs', href: '/student/jobs', icon: BriefcaseIcon },
    { name: 'Challenges', href: '/student/challenges', icon: PuzzlePieceIcon },
    { name: 'Applications', href: '/student/applications', icon: ClipboardDocumentListIcon },
    { name: 'Profile', href: '/student/profile', icon: UserCircleIcon },
  ];

  const universityNavItems = [
    { name: 'Overview', href: '/university', icon: HomeIcon },
    { name: 'Scholarships', href: '/university/scholarships', icon: AcademicCapIcon },
    { name: 'Jobs', href: '/university/jobs', icon: BriefcaseIcon },
    { name: 'Challenges', href: '/university/challenges', icon: PuzzlePieceIcon },
    { name: 'Applications', href: '/university/applications', icon: ClipboardDocumentListIcon },
    { name: 'Profile', href: '/university/profile', icon: UserCircleIcon },
  ];

  const adminNavItems = [
    { name: 'Overview', href: '/admin', icon: HomeIcon },
    { name: 'Universities', href: '/admin/universities', icon: AcademicCapIcon },
    { name: 'Students', href: '/admin/students', icon: UserCircleIcon },
    { name: 'Scholarships', href: '/admin/scholarships', icon: AcademicCapIcon },
    { name: 'Jobs', href: '/admin/jobs', icon: BriefcaseIcon },
    { name: 'Challenges', href: '/admin/challenges', icon: PuzzlePieceIcon },
    { name: 'Applications', href: '/admin/applications', icon: ClipboardDocumentListIcon },
  ];

  const navItems = isStudent ? studentNavItems : isUniversity ? universityNavItems : adminNavItems;

  return (
    <div className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0 pt-16">
      <nav className="mt-5 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 