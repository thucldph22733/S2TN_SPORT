import HttpClient from '~/utils/http-client';

const API_URL = 'productDetails/';


const ProductDetailService = {
    getProductDetailsByProductId: (productId) => {
        return HttpClient.get(`${API_URL}getProductDetailsByProductId`, {
            params: {
                productId
            }
        }).then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findColorNamesByProductId: (productId) => {
        return HttpClient.get(`${API_URL}findColorNamesByProductId`, {
            params: {
                productId
            }
        }).then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findMaterialNamesByProductId: (productId) => {
        return HttpClient.get(`${API_URL}findMaterialNamesByProductId`, {
            params: {
                productId
            }
        }).then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findSizeNamesByProductId: (productId) => {
        return HttpClient.get(`${API_URL}findSizeNamesByProductId`,
            {
                params: {
                    productId
                }
            })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    findQuantityAndPrice: (data) => {
        return HttpClient.post(`${API_URL}findQuantityAndPrice`, data)
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

export default ProductDetailService;