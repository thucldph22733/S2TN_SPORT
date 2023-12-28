import HttpClient from '~/utils/http-client';

const API_URL = 'carts/';


const CartService = {

    getAllCartDetailByUserId: (userId) => {
        return HttpClient.get(`${API_URL}getAllCartDetailByUserId?userId=${userId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getCartByUserId: (userId) => {
        return HttpClient.get(`${API_URL}getCartByUserId?userId=${userId}`)
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
    updateCartVoucher: (data) => {
        return HttpClient.patch(`${API_URL}updateCartVoucher`, data)
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

export default CartService;