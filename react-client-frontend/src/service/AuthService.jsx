import HttpClient from '~/utils/http-client';

const API_URL = 'auth/';


const AuthService = {
    login: (data) => {
        return HttpClient.post(`${API_URL}login`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    register: (data) => {
        return HttpClient.post(`${API_URL}register`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

};

export default AuthService;