import React, { useState, useEffect } from 'react';
import {
  BuildingOfficeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export default function ManageOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'university',
    email: '',
    phone: '',
    address: '',
    status: 'active',
    description: ''
  });

  useEffect(() => {
    // TODO: Fetch organizations from API
    // This is mock data for now
    setOrganizations([
      {
        id: 1,
        name: 'ಬೆಂಗಳೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ',
        type: 'university',
        email: 'info@bangaloreuniv.edu',
        phone: '080-12345678',
        address: 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ',
        status: 'active',
        description: 'ಸಾರ್ವಜನಿಕ ವಿಶ್ವವಿದ್ಯಾಲಯ',
        createdAt: '2024-03-15'
      },
      {
        id: 2,
        name: 'ಎಬಿಸಿ ಕಾರ್ಪೊರೇಶನ್',
        type: 'company',
        email: 'hr@abccorp.com',
        phone: '080-87654321',
        address: 'ಮುಂಬೈ, ಮಹಾರಾಷ್ಟ್ರ',
        status: 'active',
        description: 'ತಂತ್ರಜ್ಞಾನ ಕಂಪನಿ',
        createdAt: '2024-03-10'
      },
      {
        id: 3,
        name: 'ಎನ್ಜಿಓ ಫೌಂಡೇಶನ್',
        type: 'ngo',
        email: 'contact@ngofoundation.org',
        phone: '080-98765432',
        address: 'ದೆಹಲಿ',
        status: 'inactive',
        description: 'ಶೈಕ್ಷಣಿಕ ಸಂಸ್ಥೆ',
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
      // TODO: Save organization to API
      if (editingOrg) {
        setOrganizations(organizations.map(org =>
          org.id === editingOrg.id ? { ...org, ...formData } : org
        ));
      } else {
        setOrganizations([...organizations, {
          id: organizations.length + 1,
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        }]);
      }
      setShowForm(false);
      setEditingOrg(null);
      setFormData({
        name: '',
        type: 'university',
        email: '',
        phone: '',
        address: '',
        status: 'active',
        description: ''
      });
    } catch (err) {
      setError('ಸಂಸ್ಥೆಯನ್ನು ಉಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleEdit = (org) => {
    setEditingOrg(org);
    setFormData({
      name: org.name,
      type: org.type,
      email: org.email,
      phone: org.phone,
      address: org.address,
      status: org.status,
      description: org.description
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('ನೀವು ಖಚಿತವಾಗಿ ಈ ಸಂಸ್ಥೆಯನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        // TODO: Delete organization from API
        setOrganizations(organizations.filter(org => org.id !== id));
      } catch (err) {
        setError('ಸಂಸ್ಥೆಯನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // TODO: Update status in API
      setOrganizations(organizations.map(org =>
        org.id === id ? { ...org, status: newStatus } : org
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
            <BuildingOfficeIcon className="h-8 w-8 text-gray-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">ಸಂಸ್ಥೆಗಳ ನಿರ್ವಹಣೆ</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            ಹೊಸ ಸಂಸ್ಥೆ
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
                    ವಿಧ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ಸಂಪರ್ಕ
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
                {organizations.map((org) => (
                  <tr key={org.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-500">{org.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {org.type === 'university' ? 'ವಿಶ್ವವಿದ್ಯಾಲಯ' :
                         org.type === 'company' ? 'ಕಂಪನಿ' : 'ಎನ್ಜಿಓ'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{org.email}</div>
                      <div className="text-sm text-gray-500">{org.phone}</div>
                      <div className="text-sm text-gray-500">{org.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        org.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {org.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ನಿಷ್ಕ್ರಿಯ'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(org.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(org)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(org.id, org.status === 'active' ? 'inactive' : 'active')}
                        className={`mr-4 ${
                          org.status === 'active'
                            ? 'text-red-600 hover:text-red-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {org.status === 'active' ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(org.id)}
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
              {editingOrg ? 'ಸಂಸ್ಥೆಯನ್ನು ಸಂಪಾದಿಸಿ' : 'ಹೊಸ ಸಂಸ್ಥೆ'}
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
                <label className="block text-sm font-medium text-gray-700">ವಿಧ</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="university">ವಿಶ್ವವಿದ್ಯಾಲಯ</option>
                  <option value="company">ಕಂಪನಿ</option>
                  <option value="ngo">ಎನ್ಜಿಓ</option>
                </select>
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
                <label className="block text-sm font-medium text-gray-700">ಫೋನ್</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ವಿಳಾಸ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">ವಿವರಣೆ</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
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
                    setEditingOrg(null);
                    setFormData({
                      name: '',
                      type: 'university',
                      email: '',
                      phone: '',
                      address: '',
                      status: 'active',
                      description: ''
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