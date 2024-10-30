// Api.jsx
import axios from 'axios';
import { ACCESS_TOKEN } from "./Constants";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  //  backend URL
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;
