import React from 'react';

const UniversitiesSection = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Top Universities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University 1 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">University of California</h3>
            <p className="text-gray-600 dark:text-gray-300">
              One of the world's leading public research universities.
            </p>
          </div>

          {/* University 2 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Stanford University</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A private research university known for its academic strength.
            </p>
          </div>

          {/* University 3 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">MIT</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A world-renowned institution for science and technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesSection; 