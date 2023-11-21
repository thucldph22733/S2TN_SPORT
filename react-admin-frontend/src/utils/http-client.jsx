import axios from 'axios';

const HttpClient = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    timeout: 10000, // Thời gian tối đa chờ đợi (milliseconds) cho mỗi request
    headers: {
        'Content-Type': 'application/json',
    },
});

// Middleware để xử lý request trước khi gửi đi
HttpClient.interceptors.request.use(
    (config) => {
        // config.headers = config.headers ?? {};
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Middleware để xử lý response sau khi nhận được
HttpClient.interceptors.response.use(
    (response) => {
        // Thực hiện các xử lý sau khi nhận được response
        return response;
    },
    (error) => {
        const status = error.response?.status ?? 0;
        if (status >= 500 && status <= 599) {
            window.location.href = '/500';
        }
        // Xử lý lỗi response
        return Promise.reject(error);
    }
);

export default HttpClient;