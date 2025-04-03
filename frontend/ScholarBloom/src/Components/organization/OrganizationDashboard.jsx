import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'ಅವಲೋಕನ', href: '/organization', icon: HomeIcon },
  { name: 'ಪ್ರೊಫೈಲ್', href: '/organization/profile', icon: UserCircleIcon },
  { name: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು', href: '/organization/scholarships', icon: AcademicCapIcon },
  { name: 'ಉದ್ಯೋಗಗಳು', href: '/organization/jobs', icon: BriefcaseIcon },
  { name: 'ಸವಾಲುಗಳು', href: '/organization/challenges', icon: PuzzlePieceIcon },
  { name: 'ಅರ್ಜಿಗಳು', href: '/organization/applications', icon: ClipboardDocumentListIcon },
  { name: 'ವಿಶ್ಲೇಷಣೆ', href: '/organization/analytics', icon: ChartBarIcon },
  { name: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', href: '/organization/settings', icon: Cog6ToothIcon },
];

export default function OrganizationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-gray-900">ಸಂಸ್ಥೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 flex-shrink-0 ${
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
} 