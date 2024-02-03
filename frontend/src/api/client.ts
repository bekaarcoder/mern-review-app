/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface SuccessResponse {
    data: any;
}

interface ErrorResponse {
    error: string;
}

export type Response = SuccessResponse | ErrorResponse;

const client = axios.create({ baseURL: 'http://localhost:5050/api' });

export default client;
