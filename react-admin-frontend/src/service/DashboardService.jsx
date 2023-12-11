import HttpClient from '~/utils/http-client';

const API_URL = 'dashboards/';


const DashboardService = {
    getTop10BestSellingProducts: () => {
        return HttpClient.get(`${API_URL}getTop10BestSellingProducts`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },


    getRevenueByMonthForCurrentYear: () => {
        return HttpClient.get(`${API_URL}getRevenueByMonthForCurrentYear`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getTotalOrdersByStatus: () => {
        return HttpClient.get(`${API_URL}getTotalOrdersByStatus`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getCountDeletedUsers: () => {
        return HttpClient.get(`${API_URL}getCountDeletedUsers`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    }
};
export default DashboardService;