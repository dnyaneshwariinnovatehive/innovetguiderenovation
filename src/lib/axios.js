import axios from 'axios';
import { API_BASE } from './constants';

const api = axios.create({ timeout: 15000 });

api.interceptors.response.use(
  function onFulfilled(response) { return response; },
  function onRejected(error) {
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export function flaskApi() {
  return axios.create({ baseURL: API_BASE, timeout: 15000 });
}

export default api;
