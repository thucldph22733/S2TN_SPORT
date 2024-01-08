import HttpClient from '~/utils/http-client';

const API_URL = 'address/';

const AddressService = {
    getAddressesByUserId: (userId) => {
        return HttpClient.get(`${API_URL}getAddressesByUserId`, {
            params: { userId }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findAddressesByUserIdAnDeletedTrue: (userId) => {
        return HttpClient.get(`${API_URL}findAddressesByUserIdAnDeletedTrue`, {
            params: { userId }
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

export default AddressService;