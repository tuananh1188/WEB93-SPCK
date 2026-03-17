import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?._retry) {
            prevRequest._retry = true;
            try {
                const res = await axios.post(
                    'http://localhost:8080/users/refresh-token',
                    {},
                    { withCredentials: true }
                );
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(prevRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
