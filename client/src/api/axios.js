import axios from 'axios';

// URL base de tu API Django
const baseURL = 'http://localhost:8000/';

// Crear una instancia de axios con la URL base y configuración de encabezados
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

// Función para obtener el token JWT
export const getToken = async (username, password) => {
  try {
    const response = await api.post('api/v1/token/', { username, password });
    localStorage.setItem('token', response.data.access);
    window.location.href = '/mostrar-empleados'
    return response.data.access; // Retorna el token de acceso
  } catch (error) {
    console.error('Error al obtener el token:', error);
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};

// Función para refrescar el token JWT
export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post('api/v1/token/refresh/', { refresh: refreshToken });
    return response.data.access; // Retorna el nuevo token de acceso
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error; // Maneja el error adecuadamente en tu componente React
  }
};

// Función para incluir el token JWT en las solicitudes
export const setAuthToken = (token) => {
  
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
