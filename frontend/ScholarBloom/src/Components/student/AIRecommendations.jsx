import React, { useState, useEffect } from 'react';
import {
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  LightBulbIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        // Get user profile first to get the user ID
        const profileResponse = await fetch('http://localhost:3000/api/student/profile', {
          credentials: 'include'
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userProfile = await profileResponse.json();

        // Fetch AI recommendations based on user profile
        const recommendationsResponse = await fetch('http://localhost:3000/api/student/recommendations', {
          credentials: 'include'
        });

        if (!recommendationsResponse.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('ಶಿಫಾರಸುಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const filteredRecommendations = selectedCategory === 'all'
    ? recommendations
    : recommendations.filter(rec => rec.type === selectedCategory);

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
            <SparklesIcon className="h-8 w-8 text-gray-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">AI ಶಿಫಾರಸುಗಳು</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಎಲ್ಲಾ
            </button>
            <button
              onClick={() => setSelectedCategory('scholarship')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'scholarship'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು
            </button>
            <button
              onClick={() => setSelectedCategory('job')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'job'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಉದ್ಯೋಗಗಳು
            </button>
            <button
              onClick={() => setSelectedCategory('challenge')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'challenge'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ಸವಾಲುಗಳು
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {recommendation.type === 'scholarship' ? (
                        <AcademicCapIcon className="h-6 w-6 text-primary-500" />
                      ) : recommendation.type === 'job' ? (
                        <BriefcaseIcon className="h-6 w-6 text-primary-500" />
                      ) : (
                        <LightBulbIcon className="h-6 w-6 text-primary-500" />
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-500">
                        {recommendation.type === 'scholarship' ? 'ವಿದ್ಯಾರ್ಥಿವೇತನ' :
                         recommendation.type === 'job' ? 'ಉದ್ಯೋಗ' : 'ಸವಾಲು'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {recommendation.matchScore}% ಹೊಂದಾಣಿಕೆ
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {recommendation.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {recommendation.organization}
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    {recommendation.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">ಅಗತ್ಯಗಳು:</h4>
                    <ul className="mt-2 space-y-1">
                      {recommendation.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      ಕೊನೆಯ ದಿನಾಂಕ: {new Date(recommendation.deadline).toLocaleDateString()}
                    </div>
                    <button
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 