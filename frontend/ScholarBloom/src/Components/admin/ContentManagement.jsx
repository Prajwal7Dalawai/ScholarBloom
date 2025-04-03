import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function ContentManagement() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  useEffect(() => {
    // TODO: Fetch contents from API
    // This is mock data for now
    setContents([
      {
        id: 1,
        title: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ',
        type: 'page',
        status: 'published',
        lastUpdated: '2024-03-15',
        author: 'ನಿರ್ವಾಹಕ'
      },
      {
        id: 2,
        title: 'ಉದ್ಯೋಗ ಅವಕಾಶಗಳು',
        type: 'page',
        status: 'draft',
        lastUpdated: '2024-03-14',
        author: 'ನಿರ್ವಾಹಕ'
      },
      {
        id: 3,
        title: 'ಸ್ವಾಗತ ಸಂದೇಶ',
        type: 'announcement',
        status: 'published',
        lastUpdated: '2024-03-13',
        author: 'ನಿರ್ವಾಹಕ'
      }
    ]);
    setLoading(false);
  }, []);

  const handleStatusChange = async (contentId, newStatus) => {
    try {
      // TODO: Update content status in API
      setContents(contents.map(content => 
        content.id === contentId ? { ...content, status: newStatus } : content
      ));
    } catch (error) {
      setError('ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
    }
  };

  const handleDelete = async (contentId) => {
    if (window.confirm('ನೀವು ಖಚಿತವಾಗಿ ಈ ವಿಷಯವನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?')) {
      try {
        // TODO: Delete content from API
        setContents(contents.filter(content => content.id !== contentId));
      } catch (error) {
        setError('ವಿಷಯವನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ');
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ವಿಷಯ ನಿರ್ವಹಣೆ</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            ಹೊಸ ವಿಷಯ ಸೇರಿಸಿ
          </button>
        </div>
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
                          ಶೀರ್ಷಿಕೆ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ವಿಧ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಸ್ಥಿತಿ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಕೊನೆಯ ನವೀಕರಣ
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ಲೇಖಕ
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">ಕ್ರಿಯೆಗಳು</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {contents.map((content) => (
                        <tr key={content.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {content.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {content.type === 'page' ? 'ಪುಟ' : 'ಘೋಷಣೆ'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              content.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {content.status === 'published' ? 'ಪ್ರಕಟಿತ' : 'ಡ್ರಾಫ್ಟ್'}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(content.lastUpdated).toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {content.author}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => setEditingContent(content)}
                              className="text-primary-600 hover:text-primary-900 mr-4"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(content.id, content.status === 'published' ? 'draft' : 'published')}
                              className="text-primary-600 hover:text-primary-900 mr-4"
                            >
                              {content.status === 'published' ? (
                                <XMarkIcon className="h-5 w-5" />
                              ) : (
                                <CheckIcon className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(content.id)}
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