import HttpClient from '~/utils/http-client';

const API_URL = 'payments/';


const PaymentService = {

    payment: (data) => {
        return HttpClient.post(`${API_URL}payment`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
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
    getAllPaymentByOrdersId: (orderId) => {
        return HttpClient.get(`${API_URL}getAllPaymentByOrdersId?orderId=${orderId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
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

export default PaymentService;