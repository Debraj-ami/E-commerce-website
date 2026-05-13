import axios from "axios";

export const API_BASE_URL = "https://ecommerce-server-production-4000.up.railway.app";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token dynamically before every request
api.interceptors.request.use(
    (config) => {

        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);