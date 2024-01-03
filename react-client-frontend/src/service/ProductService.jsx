import HttpClient from '~/utils/http-client';

const API_URL = 'products/';

const ProductService = {
    getProductHomePageByProducts: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getProductHomePageByProducts`, {
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