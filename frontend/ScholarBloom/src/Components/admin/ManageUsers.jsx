import React, { useState, useEffect } from 'react';
import {
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'active'
  });

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
        name: 'ಪ್ರಿಯಾ',
        email: 'priya@example.com',
        role: 'university',
        status: 'active',
        createdAt: '2024-03-10'
      },
      {
        id: 3,
        name: 'ಮೋಹನ್',
        email: 'mohan@example.com',
        role: 'organization',
        status: 'inactive',
        createdAt: '2024-03-05'
      }
    ]);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Save user to API
      if (editingUser) {
        setUsers(users.map(user =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        ));
      } else {
        setUsers([...users, {
          id: users.length + 1,
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        }]);
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'student',
        status: 'active'
      });
    } catch (err) {
      setError('ಬಳಕೆದಾರರನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('ನೀವು ಖಚಿತವಾಗಿ ಈ ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        // TODO: Delete user from API
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('ಬಳಕೆದಾರರನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // TODO: Update status in API
      setUsers(users.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      ));
    } catch (err) {
      setError('ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-gray-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            ಹೊಸ ಬಳಕೆದಾರ
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಹೆಸರು
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಇಮೇಲ್
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಪಾತ್ರ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಸ್ಥಿತಿ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಸೇರ್ಪಡೆ ದಿನಾಂಕ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಕ್ರಿಯೆಗಳು
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {user.role === 'student' ? 'ವಿದ್ಯಾರ್ಥಿ' :
                         user.role === 'university' ? 'ವಿಶ್ವವಿದ್ಯಾಲಯ' : 'ಸಂಸ್ಥೆ'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ನಿಷ್ಕ್ರಿಯ'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className={`mr-4 ${
                          user.status === 'active'
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5" />
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

      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingUser ? 'ಬಳಕೆದಾರರನ್ನು ಸಂಪಾದಿಸಿ' : 'ಹೊಸ ಬಳಕೆದಾರ'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ಹೆಸರು</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ಇಮೇಲ್</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ಪಾತ್ರ</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="student">ವಿದ್ಯಾರ್ಥಿ</option>
                  <option value="university">ವಿಶ್ವವಿದ್ಯಾಲಯ</option>
                  <option value="organization">ಸಂಸ್ಥೆ</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ಸ್ಥಿತಿ</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="active">ಸಕ್ರಿಯ</option>
                  <option value="inactive">ನಿಷ್ಕ್ರಿಯ</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                    setFormData({
                      name: '',
                      email: '',
                      role: 'student',
                      status: 'active'
                    });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  ರದ್ದುಮಾಡಿ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  ಉಳಿಸಿ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 