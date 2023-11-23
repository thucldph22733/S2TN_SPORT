import HttpClient from '~/utils/http-client';

const API_URL = 'brands/';

const BrandService = {
    getAll: async (pageNo, pageSize, name, status) => {
        return await HttpClient.get(`${API_URL}getAll`, {
            params: { pageNo, pageSize, name, status }
        }
        );
    },

    create: async (data) => {
        return await HttpClient.post(`${API_URL}create`, data);
    },

    update: async (id, data) => {
        return await HttpClient.put(`${API_URL}update?id=${id}`, data);
    },

    delete: async (id) => {
        return await HttpClient.delete(`${API_URL}delete?id=${id}`);
    },
};

export default BrandService;