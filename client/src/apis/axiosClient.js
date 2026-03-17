import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(
                    'http://localhost:8080/users/refresh-token',
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = res.data.accessToken;
                Cookies.set('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (error) {
                Cookies.remove('token');
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(err);
    }
);

export default axiosClient;
