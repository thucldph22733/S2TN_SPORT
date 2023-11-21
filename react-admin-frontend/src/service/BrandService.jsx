// services/apiService.js
import HttpClient from '~/utils/http-client';

const API_URL = 'brands/'; // Thay đổi đường dẫn API tùy thuộc vào ứng dụng của bạn

const BrandService = {
    getAll: async (pageNo, pageSize, name, status) => {

        return await HttpClient.get(`${API_URL}getAll`, {
            params: { pageNo, pageSize, name, status },
        });

    },

    //   getById: async (id) => {
    //     try {
    //       const response = await HttpClient.get(`${API_URL}/${id}`);
    //       return response.data;
    //     } catch (error) {
    //       throw error;
    //     }
    //   },

    //   create: async (data) => {
    //     try {
    //       const response = await HttpClient.post(API_URL, data);
    //       return response.data;
    //     } catch (error) {
    //       throw error;
    //     }
    //   },

    //   update: async (id, data) => {
    //     try {
    //       const response = await HttpClient.put(`${API_URL}/${id}`, data);
    //       return response.data;
    //     } catch (error) {
    //       throw error;
    //     }
    //   },

    //   delete: async (id) => {
    //     try {
    //       const response = await HttpClient.delete(`${API_URL}/${id}`);
    //       return response.data;
    //     } catch (error) {
    //       throw error;
    //     }
    //   },
};

export default BrandService;