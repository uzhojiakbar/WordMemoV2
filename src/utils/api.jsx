import axios from "axios";
import Cookies from "js-cookie";

// http://192.168.23.100:8080/api

// const url = "/api";

const Instance = axios.create({
    baseURL: "http://37.27.215.130:5015/", // O'zingizning backend URL
    // baseURL: "http://192.168.31.63:8080/api", // O'zingizning backend URL

    timeout: 5000, // Maksimal kutish vaqti (10 soniya)
});

// Access tokenni avtomatik yuborish
Instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});


export default Instance