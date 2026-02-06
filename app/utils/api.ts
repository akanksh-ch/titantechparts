// API utility for inventory and orders using fetchWithAuth
import { fetchWithAuth } from '~/utils/auth';

/**
 * Inventory API endpoints
 */
export const inventoryApi = {
    getAll: async (params?: { category?: string; search?: string }) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append('category', params.category);
        if (params?.search) queryParams.append('search', params.search);

        const query = queryParams.toString();
        const url = `/inventory${query ? `?${query}` : ''}`;

        const response = await fetchWithAuth(url);
        return response.json();
    },

    getById: async (id: string) => {
        const response = await fetchWithAuth(`/inventory/${id}`);
        return response.json();
    },

    search: async (query: string) => {
        const response = await fetchWithAuth(`/inventory/search?q=${encodeURIComponent(query)}`);
        return response.json();
    },
};

/**
 * Orders API endpoints
 */
export const ordersApi = {
    create: async (orderData: any) => {
        const response = await fetchWithAuth('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
        return response.json();
    },

    getUserOrders: async () => {
        const response = await fetchWithAuth('/orders/me');
        return response.json();
    },

    getById: async (id: string) => {
        const response = await fetchWithAuth(`/orders/${id}`);
        return response.json();
    },
};
