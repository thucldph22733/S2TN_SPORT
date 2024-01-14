import HttpClient from '~/utils/http-client';

const API_URL = 'suppliers/';

const SupplierService = {
    getAll: (pageNo, pageSize, supplierName, phoneNumber, email, deleted) => {
        return HttpClient.get(`${API_URL}getAll`, {
            params: { pageNo, pageSize, supplierName, phoneNumber, email, deleted }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    findByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findByDeletedTrue`)
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
    findAllByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findAllByDeletedTrue`)
            .then(response => response)
            .catch(error => {
                console.error('Error in findAllByDeletedTrue:', error);
                throw error;
            });
    },
};

export default SupplierService;