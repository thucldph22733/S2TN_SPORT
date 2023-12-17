import HttpClient from '~/utils/http-client';

const API_URL = 'users/';

const UserService = {
    getUserById: (id) => {
        return HttpClient.get(`${API_URL}getUserById?id=${id}`)
            .then(response => response)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    changePassword: (data, token) => {
        return HttpClient.patch(`${API_URL}changePassword`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in changePassword:', error);
                throw error;
            });
    },

    update: (id, data) => {
        return HttpClient.put(`${API_URL}update?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },

};

export default UserService;