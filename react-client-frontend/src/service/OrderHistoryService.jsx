import HttpClient from '~/utils/http-client';

const API_URL = 'timeline/';


const OrderHistory = {

    getAllTimeLineByOrderId: (id) => {
        return HttpClient.get(`${API_URL}findAllTimelineByOrderId?id=${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in create:', error);
                throw error;
            });
    },
};

export default OrderHistory;