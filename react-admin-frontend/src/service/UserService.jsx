import HttpClient from '~/utils/http-client';

const API_URL = 'users/';

const UserService = {
    getAllUserByFilter: (data) => {
        return HttpClient.post(`${API_URL}getAllUserByFilter`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getAllUserByRole: (pageNo, pageSize, name, phoneNumber, email, deleted) => {
        return HttpClient.get(`${API_URL}getUserByRole`, {
            params: { pageNo, pageSize, name, phoneNumber, email, deleted }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getUserById: (id) => {
        return HttpClient.get(`${API_URL}getUserById`, {
            params: { id }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    create: (data) => {
        return HttpClient.post(`${API_URL}create`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
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

    delete: (id) => {
        return HttpClient.delete(`${API_URL}delete?id=${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in delete:', error);
                throw error;
            });
    },
};

export default UserService;