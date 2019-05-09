import axios from 'axios';
const config = {
  baseURL: '/api',
  timeout: 30000
};

const config2 = {
  baseURL: 'http://schrocat.cn/api',
  timeout: 30000
};
const http = axios.create(config);
const http2 = axios.create(config2);

export { http, http2 };
