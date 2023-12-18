import HttpClient from '~/utils/http-client';

const API_URL = 'carts/';


const CartService = {


    create: (data) => {
        return HttpClient.post(`${API_URL}create`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },

};

export default CartService;