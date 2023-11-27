import HttpClient from '~/utils/http-client';

const API_URL = 'auth/';

const BrandService = {

    login: (data) => {
        return HttpClient.post(`${API_URL}login`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },

};

export default BrandService;