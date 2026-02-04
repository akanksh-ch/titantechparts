import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token to requests
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear storage and redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API endpoints
export const authApi = {
    login: async (username: string, password: string) => {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post('/auth/token', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    },

    register: async (username: string, email: string, password: string) => {
        const response = await api.post('/auth/register', {
            username,
            email,
            password,
            roles: ['user'],
            isActive: true,
        });
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// Inventory API endpoints
export const inventoryApi = {
    getAll: async (params?: { category?: string; search?: string }) => {
        const response = await api.get('/inventory', { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/inventory/${id}`);
        return response.data;
    },

    search: async (query: string) => {
        const response = await api.get('/inventory/search', {
            params: { q: query },
        });
        return response.data;
    },
};

// Orders API endpoints
export const ordersApi = {
    create: async (orderData: any) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    getUserOrders: async () => {
        const response = await api.get('/orders/me');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },
};

export default api;
