/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { InternalAxiosRequestConfig } from 'axios';

interface SuccessResponse {
    data: any;
}

interface ErrorResponse {
    error: string;
}

export type Response = SuccessResponse | ErrorResponse;

// const client = axios.create({ baseURL: 'http://localhost:5050/api' });
// const client = axios.create({ baseURL: 'http://192.168.1.10:5050/api' });
const client = axios.create();
client.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    if (window.location.hostname === 'localhost') {
        config.baseURL = 'http://localhost:5050/api';
    } else {
        config.baseURL = 'http://192.168.1.10:5050/api';
    }
    return config;
});

export default client;
