import api from "./api";

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });

    console.log(response);

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.email);
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
    const response = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.status) {
      return response.data;
    }
    throw new Error(response.data.message || 'Failed to fetch user info');
  },
};


export default api;
