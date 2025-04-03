import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

// User API
export const userAPI = {
  createUser: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  getUser: async () => {
    try {
      const response = await api.get('/student/profile');
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  updateUser: async (userData) => {
    try {
      const response = await api.put('/student/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Scholarship API
export const scholarshipAPI = {
  createScholarship: async (scholarshipData) => {
    try {
      const response = await api.post('/sch', scholarshipData);
      return response.data;
    } catch (error) {
      console.error('Error creating scholarship:', error);
      throw error;
    }
  },

  getScholarship: async (scholarshipId) => {
    try {
      const response = await api.get(`/sch/${scholarshipId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting scholarship:', error);
      throw error;
    }
  },

  getScholarships: async ({ status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      const response = await api.get(`/sch?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting scholarships:', error);
      throw error;
    }
  },

  updateScholarship: async (scholarshipId, scholarshipData) => {
    try {
      const response = await api.put(`/sch/${scholarshipId}`, scholarshipData);
      return response.data;
    } catch (error) {
      console.error('Error updating scholarship:', error);
      throw error;
    }
  },

  deleteScholarship: async (scholarshipId) => {
    try {
      const response = await api.delete(`/sch/${scholarshipId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      throw error;
    }
  }
};

// Job API
export const jobAPI = {
  createJob: async (jobData) => {
    try {
      const response = await api.post('/job/jobs', jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  getJob: async (jobId) => {
    try {
      const response = await api.get(`/job/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  },

  getJobs: async ({ status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      const response = await api.get(`/job/jobs?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  },

  updateJob: async (jobId, jobData) => {
    try {
      const response = await api.put(`/job/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  deleteJob: async (jobId) => {
    try {
      const response = await api.delete(`/job/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
};

// Challenge API
export const challengeAPI = {
  createChallenge: async (challengeData) => {
    try {
      const response = await api.post('/challenges/challenges', challengeData);
      return response.data;
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  },

  getChallenge: async (challengeId) => {
    try {
      const response = await api.get(`/challenges/${challengeId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting challenge:', error);
      throw error;
    }
  },

  getChallenges: async ({ status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      const response = await api.get(`/challenges?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting challenges:', error);
      throw error;
    }
  },

  updateChallenge: async (challengeId, challengeData) => {
    try {
      const response = await api.put(`/challenges/${challengeId}`, challengeData);
      return response.data;
    } catch (error) {
      console.error('Error updating challenge:', error);
      throw error;
    }
  },

  deleteChallenge: async (challengeId) => {
    try {
      const response = await api.delete(`/challenges/${challengeId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting challenge:', error);
      throw error;
    }
  },

  getSubmissions: async ({ userId, status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      const response = await api.get(`/challenges/submissions?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting challenge submissions:', error);
      throw error;
    }
  }
};

// Application API
export const applicationAPI = {
  createApplication: async (applicationData) => {
    try {
      const response = await api.post('/applications', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  getApplication: async (applicationId) => {
    try {
      const response = await api.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting application:', error);
      throw error;
    }
  },

  getApplications: async ({ userId, status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      // Get user role from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const role = user.role || 'student';

      // Use different endpoints based on user role
      let endpoint = '/student/scholarships/applications';
      if (role === 'university') {
        endpoint = '/uni/scholarships/applications';
      }

      const response = await api.get(`${endpoint}?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting applications:', error);
      throw error;
    }
  },

  updateApplication: async (applicationId, applicationData) => {
    try {
      const response = await api.put(`/applications/${applicationId}`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  deleteApplication: async (applicationId) => {
    try {
      const response = await api.delete(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
};

// Submission API
export const submissionAPI = {
  createSubmission: async (submissionData) => {
    try {
      const response = await api.post('/challenges/submissions', submissionData);
      return response.data;
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  },

  getSubmission: async (submissionId) => {
    try {
      const response = await api.get(`/challenges/submissions/${submissionId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting submission:', error);
      throw error;
    }
  },

  getSubmissions: async ({ userId, status, sortBy, limit } = {}) => {
    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);

      const response = await api.get(`/challenges/submissions?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error getting submissions:', error);
      throw error;
    }
  },

  updateSubmission: async (submissionId, submissionData) => {
    try {
      const response = await api.put(`/challenges/submissions/${submissionId}`, submissionData);
      return response.data;
    } catch (error) {
      console.error('Error updating submission:', error);
      throw error;
    }
  },

  deleteSubmission: async (submissionId) => {
    try {
      const response = await api.delete(`/challenges/submissions/${submissionId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  }
}; 