import React from 'react';

const CardsSection = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Scholarship Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scholarships</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find and apply for scholarships that match your academic profile and interests.
            </p>
          </div>

          {/* Job Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explore career opportunities and internships from top companies.
            </p>
          </div>

          {/* Challenge Card */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Educational Challenges</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Participate in educational challenges and competitions to showcase your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection; 