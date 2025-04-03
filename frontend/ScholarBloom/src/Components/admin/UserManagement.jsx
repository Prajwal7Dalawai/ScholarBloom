import React, { useState, useEffect } from 'react';
import {
  UserGroupIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch users from API
    // This is mock data for now
    setUsers([
      {
        id: 1,
        name: 'ರಾಜೇಶ್',
        email: 'rajesh@example.com',
        role: 'student',
        status: 'active',
        createdAt: '2024-03-15'
      },
      {
        id: 2,
        name: 'ವಿಶ್ವವಿದ್ಯಾಲಯ',
        email: 'university@example.com',
        role: 'university',
        status: 'active',
        createdAt: '2024-03-14'
      },
      {
        id: 3,
        name: 'ಸಂಸ್ಥೆ',
        email: 'organization@example.com',
        role: 'organization',
        status: 'inactive',
        createdAt: '2024-03-13'
      }
    ]);
    setLoading(false);
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      // TODO: Update user status in API
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      setError('ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('ನೀವು ಖಚಿತವಾಗಿ ಈ ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        // TODO: Delete user from API
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        setError('ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-bold text-gray-900">ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          ಹೆಸರು
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಇಮೇಲ್
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಪಾತ್ರ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಸ್ಥಿತಿ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಸೇರ್ಪಡೆ ದಿನಾಂಕ
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">ಕ್ರಿಯೆಗಳು</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {user.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.role === 'student' && <UserIcon className="h-5 w-5 inline-block mr-1" />}
                            {user.role === 'university' && <BuildingOfficeIcon className="h-5 w-5 inline-block mr-1" />}
                            {user.role === 'organization' && <ShieldCheckIcon className="h-5 w-5 inline-block mr-1" />}
                            {user.role}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                              className="text-primary-600 hover:text-primary-900 mr-4"
                            >
                              {user.status === 'active' ? (
                                <XMarkIcon className="h-5 w-5" />
                              ) : (
                                <CheckIcon className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 