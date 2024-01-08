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

};

export default ProductDetailService;