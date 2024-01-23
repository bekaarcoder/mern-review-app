import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:5050/api' });

export default client;
