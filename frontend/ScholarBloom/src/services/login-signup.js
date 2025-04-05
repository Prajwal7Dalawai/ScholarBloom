import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const googleLogin = async (token) => {
  try {
    console.log('Attempting Google login with token:', token);
    const response = await api.post('/auth/google/login', { token });
    console.log('Google login response:', response);
    return response.data;
  } catch (error) {
    console.error('Google Login Error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
}; 