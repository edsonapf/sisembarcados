import axios from 'axios';

// const IP = '10.204.241.180';
// const IP = '192.168.15.9';
const IP = '10.58.0.43';
const URL = `http://${IP}`;
const PORT = '3000';

const axiosInstance = axios.create({
    baseURL: `${URL}:${PORT}`,
    timeout: 10000,
});

export { axiosInstance };