import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Replace with your backend URL

export const redirectToGoogle = () => {
    window.location.href = `${API_URL}/api/login/google`;
};

export const handleGoogleCallback = async (code) => {
    try {
        const response = await axios.get(`${API_URL}/api/google/callback?code=${code}`);
        return response.data;
    } catch (error) {
        console.error('Error handling Google callback', error);
        throw error;
    }
};
