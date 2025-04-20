import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const fileService = {
    uploadFile: async (file, type) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to upload file');
        }
    },

    deleteFile: async (fileId) => {
        try {
            await axios.delete(`${API_URL}/upload/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete file');
        }
    },

    getFileUrl: (fileId) => {
        return `${API_URL}/upload/${fileId}`;
    }
};

export default fileService; 