import React, { useState, useEffect } from 'react';
import { challengeAPI, submissionAPI, userAPI } from '../../services/api';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);

        // Get user profile first to get the user ID
        const userProfile = await userAPI.getUser();

        const challengesData = await challengeAPI.getChallenges({
          status: filter === 'all' ? undefined : filter,
          sortBy: sortBy
        });

        // ಸವಾಲು ಸಲ್ಲಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ
        const submissions = await submissionAPI.getSubmissions({
          userId: userProfile._id
        });

        // ಸವಾಲುಗಳನ್ನು ಸಲ್ಲಿಕೆ ಸ್ಥಿತಿಯೊಂದಿಗೆ ಸಂಯೋಜಿಸಿ
        const challengesWithStatus = challengesData.map(challenge => ({
          ...challenge,
          submitted: submissions.some(sub => sub.challengeId === challenge.id),
          submissionStatus: submissions.find(sub => sub.challengeId === challenge.id)?.status
        }));

        setChallenges(challengesWithStatus);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setError('ಸವಾಲುಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [filter, sortBy]);

  const handleSubmit = async (challengeId) => {
    try {
      // Get user profile first to get the user ID
      const userProfile = await userAPI.getUser();

      await submissionAPI.createSubmission({
        userId: userProfile._id,
        challengeId: challengeId,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // ಸವಾಲು ಪಟ್ಟಿಯನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ
      const updatedChallenges = challenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, submitted: true, submissionStatus: 'pending' }
          : challenge
      );
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error submitting challenge:', error);
      setError('ಸವಾಲು ಸಲ್ಲಿಸುವಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ಫಿಲ್ಟರ್ ಮತ್ತು ಸಾರ್ಟ್ ಆಯ್ಕೆಗಳು */}
      <div className="flex flex-wrap gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಎಲ್ಲಾ
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'active'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಸಕ್ರಿಯ
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'closed'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಮುಚ್ಚಲಾಗಿದೆ
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSortBy('deadline')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'deadline'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಕೊನೆಯ ದಿನಾಂಕ
          </button>
          <button
            onClick={() => setSortBy('reward')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              sortBy === 'reward'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ಬಹುಮಾನ
          </button>
        </div>
      </div>

      {/* ಸವಾಲು ಪಟ್ಟಿ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                challenge.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {challenge.status === 'active' ? 'ಸಕ್ರಿಯ' : 'ಮುಚ್ಚಲಾಗಿದೆ'}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">ಬಹುಮಾನ:</span>
                <span className="font-medium">₹{challenge.reward.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ಕೊನೆಯ ದಿನಾಂಕ:</span>
                <span className="font-medium">
                  {new Date(challenge.deadline).toLocaleDateString('kn-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ಕಷ್ಟದ ಮಟ್ಟ:</span>
                <span className="font-medium">{challenge.difficulty}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => window.location.href = `/challenges/${challenge.id}`}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ಹೆಚ್ಚಿನ ವಿವರಗಳು
              </button>
              {challenge.status === 'active' && (
                <button
                  onClick={() => handleSubmit(challenge.id)}
                  disabled={challenge.submitted}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    challenge.submitted
                      ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {challenge.submitted
                    ? challenge.submissionStatus === 'pending'
                      ? 'ಸಲ್ಲಿಸಲಾಗಿದೆ'
                      : challenge.submissionStatus === 'approved'
                      ? 'ಅನುಮೋದಿಸಲಾಗಿದೆ'
                      : 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'
                    : 'ಸಲ್ಲಿಸಿ'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList; 