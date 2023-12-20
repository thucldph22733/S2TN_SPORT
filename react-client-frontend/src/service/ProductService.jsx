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
    findProductsByFilters: (data) => {
        return HttpClient.post(`${API_URL}findProductsByFilters`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
};

export default ProductService;