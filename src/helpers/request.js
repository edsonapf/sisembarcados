import axios from 'axios';

const URL = 'https://powerful-beyond-82127.herokuapp.com';

const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 10000,
});

export { axiosInstance };