import HttpClient from '~/utils/http-client';

const API_URL = 'cartDetails/';


const CartDetailService = {
    getAllCartDetailByCartId: (cartId) => {
        return HttpClient.get(`${API_URL}getAllCartDetailByCartId?cartId=${cartId}`)
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

    update: (quantity, id) => {
        return HttpClient.patch(`${API_URL}updateQuantity?quantity=${quantity}&id=${id}`)
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

export default CartDetailService;