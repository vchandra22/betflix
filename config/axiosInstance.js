import axios from 'axios';

const API_KEY = '16ec578b6f0464a92c6d8ddf1833b6ef';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export default axiosInstance;
