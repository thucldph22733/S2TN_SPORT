import HttpClient from '~/utils/http-client';

const API_URL = 'orders/';


const OrderService = {
    getAllOrders: (pageNo, pageSize, statusName) => {
        return HttpClient.get(`${API_URL}getAllOrders`, {
            params: { pageNo, pageSize, statusName }
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

    orderCancel: (id, data) => {
        return HttpClient.patch(`${API_URL}orderCancel?id=${id}`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in update:', error);
                throw error;
            });
    },

    getAllOrderByStatusId: (pageNo, pageSize) => {
        return HttpClient.get(`${API_URL}getAllOrderByStatusId`, {
            params: { pageNo, pageSize }
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
                console.error('Error in create:', error);
                throw error;
            });
    },

    // updateOrderStatus: (id, data) => {
    //     return HttpClient.put(`${API_URL}updateOrderStatus?id=${id}`, data)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in update:', error);
    //             throw error;
    //         });
    // },


    updateOrderStatus: (data) => {
        return HttpClient.patch(`${API_URL}updateOrderStatus`, data)
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