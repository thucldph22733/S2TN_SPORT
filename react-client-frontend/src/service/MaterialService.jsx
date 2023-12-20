import HttpClient from '~/utils/http-client';

const API_URL = 'materials/';

const MaterialService = {

    findAllByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findAllByDeletedTrue`)
            .then(response => response)
            .catch(error => {
                console.error('Error in findAllByDeletedTrue:', error);
                throw error;
            });
    },
};

export default MaterialService;