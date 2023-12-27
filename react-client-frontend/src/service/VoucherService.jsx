import HttpClient from '~/utils/http-client';

const API_URL = 'vouchers/';

const VoucherService = {
    findAllVoucherByDeletedTrue: () => {
        return HttpClient.get(`${API_URL}findAllVoucherByDeletedTrue`)
            .then(response => response)
            .catch(error => {
                console.error('Error in findAllByDeletedTrue:', error);
                throw error;
            });
    },
};

export default VoucherService;