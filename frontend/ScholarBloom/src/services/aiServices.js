import axios from 'axios';

const API_URL = 'https://scholarbloom-backend-142097269177.asia-south1.run.app/api';

export const aiServices = {
  // ಶಾಲರ್‌ಶಿಪ್ ಶಿಫಾರಸುಗಳು
  getScholarshipRecommendations: async (studentProfile) => {
    try {
      const response = await axios.post(`${API_URL}/ai/scholarships/recommend`, studentProfile);
      return response.data;
    } catch (error) {
      throw new Error('ಶಾಲರ್‌ಶಿಪ್ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ');
    }
  },

  // ಉದ್ಯೋಗ ಶಿಫಾರಸುಗಳು
  getJobRecommendations: async (studentProfile) => {
    try {
      const response = await axios.post(`${API_URL}/ai/jobs/recommend`, studentProfile);
      return response.data;
    } catch (error) {
      throw new Error('ಉದ್ಯೋಗ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ');
    }
  },

  // ಸವಾಲು ಶಿಫಾರಸುಗಳು
  getChallengeRecommendations: async (studentProfile) => {
    try {
      const response = await axios.post(`${API_URL}/ai/challenges/recommend`, studentProfile);
      return response.data;
    } catch (error) {
      throw new Error('ಸವಾಲು ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ');
    }
  },

  // ಅರ್ಜಿ ವಿಶ್ಲೇಷಣೆ
  analyzeApplication: async (applicationData) => {
    try {
      const response = await axios.post(`${API_URL}/ai/applications/analyze`, applicationData);
      return response.data;
    } catch (error) {
      throw new Error('ಅರ್ಜಿ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ದೋಷ');
    }
  },

  // ರೆಸ್ಯೂಮ್ ಸುಧಾರಣೆಗಳು
  getResumeImprovements: async (resumeData) => {
    try {
      const response = await axios.post(`${API_URL}/ai/resume/improve`, resumeData);
      return response.data;
    } catch (error) {
      throw new Error('ರೆಸ್ಯೂಮ್ ಸುಧಾರಣೆಗಳನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ');
    }
  },

  // ಕೌಶಲ್ಯ ವಿಶ್ಲೇಷಣೆ
  analyzeSkills: async (skillsData) => {
    try {
      const response = await axios.post(`${API_URL}/ai/skills/analyze`, skillsData);
      return response.data;
    } catch (error) {
      throw new Error('ಕೌಶಲ್ಯ ವಿಶ್ಲೇಷಣೆಯಲ್ಲಿ ದೋಷ');
    }
  },

  // ಸಂದರ್ಶನ ತಯಾರಿ
  getInterviewPreparation: async (interviewData) => {
    try {
      const response = await axios.post(`${API_URL}/ai/interview/prepare`, interviewData);
      return response.data;
    } catch (error) {
      throw new Error('ಸಂದರ್ಶನ ತಯಾರಿ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ');
    }
  }
};

export default aiServices; 