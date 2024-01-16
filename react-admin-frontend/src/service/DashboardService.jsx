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


    getRevenueByMonthForCurrentYear: (year) => {
        return HttpClient.get(`${API_URL}getRevenueByMonthForCurrentYear?year=${year}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getTotalOrdersByStatus: (data) => {
        return HttpClient.post(`${API_URL}getTotalOrdersByStatus`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getCountDeletedUsers: (data) => {
        return HttpClient.post(`${API_URL}deleted-users/count`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    }
    ,
    getTotalStockQuantityOrder: (data) => {
        return HttpClient.post(`${API_URL}completed-orders/count`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },
    getRevenue: (data) => {
        return HttpClient.post(`${API_URL}revenue`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    },

    getTotalStockQuantityProduct: (data) => {
        return HttpClient.post(`${API_URL}total-stock-quantity`, data)
            .then(response => response.data)
            .catch(error => {
                console.error('Error in getAll:', error);
                throw error;
            });
    }
};
export default DashboardService;