import api from "./api";

export const moviesService = {
  async getAllMovies() {
    const response = await api.get('movie/allMovies', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.status === 403) {
      throw new Error('Acesso negado');
    }

    return response.data;
  },

  async getMovies(totalPages: number, page: number) {
    const response = await api.get('movie', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { totalPages, page },
    });

    if (response.status === 403) {
      throw new Error('Acesso negado');
    }

    return response.data;
  },

  async getMovieById(id: string) {
    const response = await api.get(`movie/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.status === 403) {
      throw new Error('Acesso negado');
    }

    return response.data;
  },

  async getNewMovie(title: string) {
    const response = await api.get('movie/search', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { title },
    });

    if (response.status === 403) {
      throw new Error('Acesso negado');
    }

    return response.data;
  },

  async deleteMovie(id: string) {
    const response = await api.delete(`/movie/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.status === 403) {
      throw new Error('Acesso negado');
    }

    return response.data;
  },
};
