import HttpClient from '~/utils/http-client';

const API_URL = 'orderDetails/';

const OrderDetailService = {
    getOrderDetailByOrderId: (pageNo, pageSize, orderId) => {
        return HttpClient.get(`${API_URL}getOrderDetailByOrderId`, {
            params: { pageNo, pageSize, orderId }
        })
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
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    updateQuantityOrderDetail: (quantity, id) => {
        return HttpClient.patch(`${API_URL}updateQuantityOrderDetail?quantity=${quantity}&id=${id}`)
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
                console.error('Error in getAll:', error);
                throw error;
            });
    },
};

export default OrderDetailService;