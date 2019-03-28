import axios from 'axios';
const config = {
  baseURL: '/api',
  timeout: 30000
};

const http = axios.create(config);
export default http;
