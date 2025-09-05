import axios from 'axios';
import { create } from 'domain';

const api = axios.create({
  baseURL: 'http://localhost:8005/',
});

export default api;