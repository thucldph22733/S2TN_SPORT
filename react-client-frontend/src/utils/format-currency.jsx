const formatCurrency = (amount) => {

    return isNaN(parseFloat(amount)) ? '' : parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export default formatCurrency;