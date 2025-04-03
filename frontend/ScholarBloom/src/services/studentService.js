import api from './api';

export const studentService = {
    getProfile: async () => {
        try {
            const response = await api.get('/student/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/student/profile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getScholarships: async (filters = {}) => {
        try {
            const response = await api.get('/student/scholarships', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    applyScholarship: async (scholarshipId, applicationData) => {
        try {
            const response = await api.post(`/student/scholarships/${scholarshipId}/apply`, applicationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getApplications: async () => {
        try {
            const response = await api.get('/student/applications');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getCourses: async (filters = {}) => {
        try {
            const response = await api.get('/student/courses', { params: filters });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    enrollCourse: async (courseId) => {
        try {
            const response = await api.post(`/student/courses/${courseId}/enroll`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getEnrolledCourses: async () => {
        try {
            const response = await api.get('/student/courses/enrolled');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 