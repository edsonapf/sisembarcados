import axios from 'axios';

const URL = 'http://192.168.15.9';
const PORT = '3000';

const axiosInstance = axios.create({
    baseURL: `${URL}:${PORT}`,
    timeout: 1000,
});

export { axiosInstance };