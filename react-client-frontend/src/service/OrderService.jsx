import HttpClient from '~/utils/http-client';

const API_URL = 'orders/';

const OrderService = {
    getAllOrdersByUserId: (pageNo, pageSize, userId, statusName) => {
        return HttpClient.get(`${API_URL}getAllOrdersByUserId`, {
            params: { pageNo, pageSize, userId, statusName }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    findOrderById: (id) => {
        return HttpClient.get(`${API_URL}findOrderById?id=${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    create: (data) => {
        return HttpClient.post(`${API_URL}createOrderOnline`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },

    updateOrderStatus: (data) => {
        return HttpClient.patch(`${API_URL}updateOrderStatus`, data)
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

export default OrderService;