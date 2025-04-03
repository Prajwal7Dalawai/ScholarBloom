import api from './api';

export const universityService = {
    getProfile: async () => {
        try {
            const response = await api.get('/university/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/university/profile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createScholarship: async (scholarshipData) => {
        try {
            const response = await api.post('/university/scholarships', scholarshipData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getScholarships: async (filters = {}) => {
        try {
            const response = await api.get('/university/scholarships', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateScholarship: async (scholarshipId, scholarshipData) => {
        try {
            const response = await api.put(`/university/scholarships/${scholarshipId}`, scholarshipData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteScholarship: async (scholarshipId) => {
        try {
            const response = await api.delete(`/university/scholarships/${scholarshipId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getApplications: async (filters = {}) => {
        try {
            const response = await api.get('/university/applications', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateApplicationStatus: async (applicationId, status) => {
        try {
            const response = await api.put(`/university/applications/${applicationId}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createCourse: async (courseData) => {
        try {
            const response = await api.post('/university/courses', courseData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCourses: async (filters = {}) => {
        try {
            const response = await api.get('/university/courses', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCourse: async (courseId, courseData) => {
        try {
            const response = await api.put(`/university/courses/${courseId}`, courseData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteCourse: async (courseId) => {
        try {
            const response = await api.delete(`/university/courses/${courseId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createJob: async (jobData) => {
        try {
            const response = await api.post('/university/jobs', jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getJobs: async (filters = {}) => {
        try {
            const response = await api.get('/university/jobs', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateJob: async (jobId, jobData) => {
        try {
            const response = await api.put(`/university/jobs/${jobId}`, jobData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteJob: async (jobId) => {
        try {
            const response = await api.delete(`/university/jobs/${jobId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAnalytics: async () => {
        try {
            const response = await api.get('/university/analytics');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 