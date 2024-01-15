import HttpClient from '~/utils/http-client';

const API_URL = 'products/';

const ProductService = {
    getAllProducts: (data) => {
        return HttpClient.post(`${API_URL}getAllProducts`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findAllByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findAllByDeletedTrue`)
            .then(response => response)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findProductById: (productId) => {
        return HttpClient.get(`${API_URL}findProductById?productId=${productId}`)
            .then(response => response)
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

export default ProductService;