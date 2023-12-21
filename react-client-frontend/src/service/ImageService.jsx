import HttpClient from '~/utils/http-client';

const API_URL = 'images/';

const ImageService = {
    findImageByProductId: (productId) => {
        return HttpClient.get(`${API_URL}findImageByProductId`, {
            params: {
                productId
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error('Error in findAllByDeletedTrue:', error);
                throw error;
            });
    },
};

export default ImageService;