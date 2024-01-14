import HttpClient from '~/utils/http-client';

const API_URL = 'productDetails/';


const ProductDetailService = {

    getAllProductDetailsFilter: (data) => {
        return HttpClient.post(`${API_URL}getAllProductDetailsFilter`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    createProductDetail: (data) => {
        return HttpClient.post(`${API_URL}create`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    create: (data) => {
        return HttpClient.post(`${API_URL}createList`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    update: (data, id) => {
        return HttpClient.put(`${API_URL}update?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getAllByProductId: (productId, pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getAllByProductId`, {
            params: {
                productId, pageNo, pageSize
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
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
    findProductDetailById: (id) => {
        return HttpClient.get(`${API_URL}findProductDetailById`, {
            params: {
                id
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    }
};

export default ProductDetailService;