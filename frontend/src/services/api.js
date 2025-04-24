// porsche-crud/frontend/src/services/api.js
import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: 'http://localhost:5001/api/carros',
  timeout: 10000,
});

// Adicionar interceptor para corrigir a estrutura da resposta
api.interceptors.response.use(
  response => {
    // Verifica se a resposta já tem a estrutura esperada
    if (response.data && typeof response.data === 'object') {
      return response.data;
    }
    // Se não, cria a estrutura padrão
    return {
      success: true,
      data: response.data
    };
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;