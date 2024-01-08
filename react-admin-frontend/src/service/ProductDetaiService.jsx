import HttpClient from '~/utils/http-client';

const API_URL = 'productDetails/';


const ProductDetailService = {


    // getTotalOrdersByStatus: () => {
    //     return HttpClient.get(`${API_URL}getTotalOrdersByStatus`)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in getAll:', error);
    //             throw error;
    //         });
    // },

    getAllProductDetails: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getAllProductDetails`, {
            params: { pageNo, pageSize }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    // create: (data) => {
    //     return HttpClient.post(`${API_URL}create`, data)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in create:', error);
    //             throw error;
    //         });
    // },

    // updateTimeLine: (id, data) => {
    //     return HttpClient.put(`${API_URL}updateTimeLine?id=${id}`, data)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in update:', error);
    //             throw error;
    //         });
    // },

    // delete: (id) => {
    //     return HttpClient.delete(`${API_URL}delete?id=${id}`)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in delete:', error);
    //             throw error;
    //         });
    // },
};

export default ProductDetailService;