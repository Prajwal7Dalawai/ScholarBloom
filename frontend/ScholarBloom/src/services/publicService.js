import api from './api';

export const publicService = {
    getScholarships: async (filters = {}) => {
        try {
            const response = await api.get('/public/scholarships', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getScholarshipDetails: async (scholarshipId) => {
        try {
            const response = await api.get(`/public/scholarships/${scholarshipId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCourses: async (filters = {}) => {
        try {
            const response = await api.get('/public/courses', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCourseDetails: async (courseId) => {
        try {
            const response = await api.get(`/public/courses/${courseId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobs: async (filters = {}) => {
        try {
            const response = await api.get('/public/jobs', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobDetails: async (jobId) => {
        try {
            const response = await api.get(`/public/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUniversities: async (filters = {}) => {
        try {
            const response = await api.get('/public/universities', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getUniversityDetails: async (universityId) => {
        try {
            const response = await api.get(`/public/universities/${universityId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    submitContactForm: async (formData) => {
        try {
            const response = await api.post('/public/contact', formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 