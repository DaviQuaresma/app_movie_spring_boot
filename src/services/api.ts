import axios from 'axios';
import { create } from 'domain';

const api = axios.create({
  baseURL: 'http://localhost:8005/',
});

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    }
    throw new Error(response.data.message || 'Failed to login');
  },

  async create(email: string, password: string, fullName: string) {
    try {
      const response = await api.post('/auth/signup', {
        email,
        password,
        fullName,
      });

      if (response.data.status) {
        return response.data;
      }
      throw new Error(response.data.message || 'Failed to create user');
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data?.message || `Erro: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('Erro de conexão com o servidor');
      } else {
        throw new Error(error.message || 'Erro desconhecido');
      }
    }
  },

  async me() {
    const response = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.status) {
      return response.data;
    }
    throw new Error(response.data.message || 'Failed to fetch user info');
  },
};

export const moviesService = {
  async getMovies() {
    const response = await api.post('movie');
    return response.data;
  },

  async getMovieById(id: string) {
    const response = await api.get(`movie/id`, { params: { id } });
    return response.data;
  },

  async getNewMovie(title: string) {
    const response = await api.get('movie/search', { params: { title } });
    return response.data;
  },

  async deleteMovie(id: string) {
    const response = await api.delete(`movie/id`, { data: { id } });
    return response.data;
  },
};

export default api;
