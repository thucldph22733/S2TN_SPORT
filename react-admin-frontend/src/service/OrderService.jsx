import HttpClient from '~/utils/http-client';

const API_URL = 'orders/';


const OrderService = {
    // getAll: (pageNo, pageSize, name, phoneNumber, email, deleted) => {
    //     return HttpClient.get(`${API_URL}getAll`, {
    //         params: { pageNo, pageSize, name, phoneNumber, email, deleted }
    //     })
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error in getAll:', error);
    //             throw error;
    //         });
    // },


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

    updateTimeLine: (id, data) => {
        return HttpClient.put(`${API_URL}updateTimeLine?id=${id}`, data)
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