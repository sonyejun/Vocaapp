import axios from "axios";

const API_URL = 'http://localhost:4000';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Function to send GET requests
export const fetchData = async (endpoint, token) => {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        // console.log(endpoint, token)
        const response = await api.get(`${endpoint}`, { headers });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Function to send post requests
export const postData = async (endpoint, data, token) => {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        console.log(endpoint, data)
        const response = await api.post(`${endpoint}`, data, { headers });
        
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Function to send put requests
export const putData = async (endpoint, data, token) => {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.put(`${endpoint}`, data, { headers });

        return response.data;
    } catch (error) {
        console.error('Error editing data:', error);
        throw error;
    }
};

// Function to send delete requests
export const deleteData = async (endpoint, token) => {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await api.delete(`${endpoint}`, { headers });
        
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};

// Function to send post requests
export const postRefreshToken = async (endpoint) => {
    try {
        const response = await api.post(`${endpoint}`);
        
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};