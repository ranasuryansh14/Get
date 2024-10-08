// Api.jsx
import axios from 'axios';
import { ACCESS_TOKEN } from "./Constants";

const Api = axios.create({
    baseURL: "http://127.0.0.1:8000/",  // Directly set the backend URL
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
