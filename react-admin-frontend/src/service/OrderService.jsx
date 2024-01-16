import HttpClient from '~/utils/http-client';

const API_URL = 'orders/';


const OrderService = {
    getAllOrdersAndFilter: (data) => {
        return HttpClient.post(`${API_URL}getAllOrdersAndFilter`, data)
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

    excel: () => {
        return HttpClient.get(`${API_URL}excel`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getAllOrderByStatusName: () => {
        return HttpClient.get(`${API_URL}getAllOrderByStatusName`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    create: () => {
        return HttpClient.post(`${API_URL}createOrderInStore`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },
    updateOrder: (data) => {
        return HttpClient.put(`${API_URL}updateOrder`, data)
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
    updateOrderVoucher: (orderId, voucherCode) => {
        return HttpClient.patch(`${API_URL}updateOrderVoucher?orderId=${orderId}&voucherCode=${voucherCode}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },
    updateOrderUser: (orderId, userId) => {
        return HttpClient.patch(`${API_URL}updateOrderUser?orderId=${orderId}&userId=${userId}`,)
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