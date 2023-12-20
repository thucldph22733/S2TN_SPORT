import HttpClient from '~/utils/http-client';

const API_URL = 'brands/';

const BrandService = {

    findAllByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findAllByDeletedTrue`)
            .then(response => response)
            .catch(error => {
                console.error('Error in findAllByDeletedTrue:', error);
                throw error;
            });
    },
};

export default BrandService;