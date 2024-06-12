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
        console.log(endpoint, token)
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
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const transitionAPI = async (word) => {
    try {
        const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;
        const body = {
            q: word,
            target: 'ko' 
        };

        const response = await axios.post(url, body);
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.log(error);
        throw error;
    }
}