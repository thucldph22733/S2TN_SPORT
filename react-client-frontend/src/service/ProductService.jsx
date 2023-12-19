import HttpClient from '~/utils/http-client';

const API_URL = 'products/';

const ProductService = {
    getProductHomePageByProductSale: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getProductHomePageByProductSale`, {
            params: { pageNo, pageSize }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getProductHomePageByProductNew: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getProductHomePageByProductNew`, {
            params: { pageNo, pageSize }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getProductHomePageByProductHot: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getProductHomePageByProductHot`, {
            params: { pageNo, pageSize }
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

export default ProductService;