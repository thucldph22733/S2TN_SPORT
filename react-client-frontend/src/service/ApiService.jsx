
import axios from 'axios';

const host = "https://provinces.open-api.vn/api/";

const getProvinces = (depth) => {
    return axios.get(`${host}?depth=${depth}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu địa chỉ:', error);
            throw error;
        });
};

const getDistrictsByCity = (cityCode, depth) => {
    return axios.get(`${host}p/${cityCode}?depth=${depth}`)
        .then(response => response.data.districts)
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu quận huyện:', error);
            throw error;
        });
};

const getWardsByDistrict = (districtCode, depth) => {
    return axios.get(`${host}d/${districtCode}?depth=${depth}`)
        .then(response => response.data.wards)
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu phường xã:', error);
            throw error;
        });
};


export {
    getProvinces, getDistrictsByCity, getWardsByDistrict,
};