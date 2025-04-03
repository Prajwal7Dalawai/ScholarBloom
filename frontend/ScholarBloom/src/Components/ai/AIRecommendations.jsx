import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { aiServices } from '../../services/aiServices';

export default function AIRecommendations() {
  const { currentUser } = useAuth();
  const [recommendations, setRecommendations] = useState({
    scholarships: [],
    jobs: [],
    challenges: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!currentUser) return;

      try {
        setLoading(true);
        setError(null);

        // ಎಲ್ಲಾ ಶಿಫಾರಸುಗಳನ್ನು ಒಟ್ಟಿಗೆ ಪಡೆಯಿರಿ
        const [scholarships, jobs, challenges] = await Promise.all([
          aiServices.getScholarshipRecommendations(currentUser),
          aiServices.getJobRecommendations(currentUser),
          aiServices.getChallengeRecommendations(currentUser)
        ]);

        setRecommendations({
          scholarships,
          jobs,
          challenges
        });
      } catch (err) {
        setError('ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ');
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ಶಾಲರ್‌ಶಿಪ್ ಶಿಫಾರಸುಗಳು */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ಶಾಲರ್‌ಶಿಪ್ ಶಿಫಾರಸುಗಳು</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-medium text-gray-900">{scholarship.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{scholarship.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {scholarship.matchPercentage}% ಹೊಂದಾಣಿಕೆ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ಉದ್ಯೋಗ ಶಿಫಾರಸುಗಳು */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ಉದ್ಯೋಗ ಶಿಫಾರಸುಗಳು</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-medium text-gray-900">{job.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.matchPercentage}% ಹೊಂದಾಣಿಕೆ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ಸವಾಲು ಶಿಫಾರಸುಗಳು */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ಸವಾಲು ಶಿಫಾರಸುಗಳು</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-medium text-gray-900">{challenge.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{challenge.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {challenge.matchPercentage}% ಹೊಂದಾಣಿಕೆ
                </span>
                <span className="text-sm text-gray-500">
                  ಬಹುಮಾನ: ₹{challenge.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 