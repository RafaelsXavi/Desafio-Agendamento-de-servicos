import axios from 'axios';

// API URL configurada via variável de ambiente
// Em desenvolvimento: usa localhost:5000
// Em produção (Vercel): usa URL do backend no Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000, // 15 segundos de timeout
});

// Contador de tentativas para retry
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

// Função para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor com retry automático
api.interceptors.response.use(
  (response) => {
    retryCount = 0; // Reset contador em sucesso
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Se não tiver config de retry, inicializa
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = 0;
    }
    
    // Se for erro de timeout ou network e ainda não excedeu retries
    if (
      (error.code === 'ECONNABORTED' || 
       error.message.includes('timeout') || 
       error.message.includes('Network Error') ||
       !error.response) &&
      originalRequest._retryCount < MAX_RETRIES
    ) {
      console.warn(`API request failed, retrying (${originalRequest._retryCount + 1}/${MAX_RETRIES})...`);
      
      originalRequest._retryCount++;
      retryCount++;
      
      // Delay antes de retry
      await delay(RETRY_DELAY * originalRequest._retryCount);
      
      // Tenta novamente
      return api(originalRequest);
    }
    
    // Se excedeu retries ou é outro tipo de erro
    if (originalRequest._retryCount >= MAX_RETRIES) {
      console.error('API request failed after maximum retries');
      
      // Mostrar alerta ao usuário sobre conexão
      if (typeof window !== 'undefined') {
        console.warn('Servidor offline ou sem conexão. Verifique sua internet.');
      }
    }
    
    return Promise.reject(error);
  }
);

// Função para verificar se API está online
export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`, {
      timeout: 5000
    });
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
};

export default api;
