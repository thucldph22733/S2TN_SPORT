import HttpClient from '~/utils/http-client';

const API_URL = 'orders/';

const OrderService = {
    getAllOrdersByUserId: (pageNo, pageSize, userId, orderStatusId) => {
        return HttpClient.get(`${API_URL}getAllOrdersByUserId`, {
            params: { pageNo, pageSize, userId, orderStatusId }
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
        return HttpClient.post(`${API_URL}create`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },

    updateOrderStatus: (id, data) => {
        return HttpClient.put(`${API_URL}updateOrderStatus?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },


    updateOrderStatusCancle: (id, data) => {
        return HttpClient.put(`${API_URL}updateOrderStatusCancle?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },

    updateTimeLine: (id, data) => {
        return HttpClient.put(`${API_URL}updateTimeLine?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },

    updateTimeLine2: (id, data) => {
        return HttpClient.put(`${API_URL}updateTimeLine2?id=${id}`, data)
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