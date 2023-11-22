import HttpClient from '~/utils/http-client';

const API_URL = 'brands/';

const BrandService = {
    getAll: async (pageNo, pageSize) => {
        return await HttpClient.get(`${API_URL}getAll`, {
            params: { pageNo, pageSize }
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
        return await HttpClient.delete(`${API_URL}/${id}`);
    },
};

export default BrandService;