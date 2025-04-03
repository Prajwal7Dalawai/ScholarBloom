import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'ಅವಲೋಕನ', href: '/admin', icon: HomeIcon },
  { name: 'ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ', href: '/admin/users', icon: UserGroupIcon },
  { name: 'ಸಂಸ್ಥೆಗಳ ನಿರ್ವಹಣೆ', href: '/admin/organizations', icon: BuildingOfficeIcon },
  { name: 'ವಿಷಯ ನಿರ್ವಹಣೆ', href: '/admin/content', icon: DocumentTextIcon },
  { name: 'ವಿಶ್ಲೇಷಣೆ', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'ಭದ್ರತೆ', href: '/admin/security', icon: ShieldCheckIcon },
  { name: 'ಅಧಿಸೂಚನೆಗಳು', href: '/admin/notifications', icon: BellIcon },
  { name: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-2xl font-bold text-gray-900">ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</h1>
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