// API utility for inventory and orders using fetchWithAuth
import { fetchWithAuth } from "~/utils/auth";

/**
 * Inventory API endpoints
 */
export const inventoryApi = {
  getAll: async (params?: { category?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);

    const query = queryParams.toString();
    const url = `/inventory${query ? `?${query}` : ""}`;

    const response = await fetchWithAuth(url);
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetchWithAuth(`/inventory/${id}`);
    return response.json();
  },

  search: async (query: string) => {
    const response = await fetchWithAuth(
      `/inventory/search?q=${encodeURIComponent(query)}`,
    );
    return response.json();
  },

  create: async (itemData: {
    name: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
  }) => {
    const response = await fetchWithAuth("/inventory", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
    return response.json();
  },

  updateById: async (
    id: string,
    updateData: {
      name: string;
      category: string;
      price: number;
      stock: number;
      imageUrl?: string;
    },
  ) => {
    const putResponse = await fetchWithAuth(`/inventory/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });

    if (putResponse.status === 405) {
      const patchResponse = await fetchWithAuth(`/inventory/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
      });
      return patchResponse.json();
    }

    return putResponse.json();
  },

  deleteById: async (id: string) => {
    const response = await fetchWithAuth(`/inventory/${id}`, {
      method: "DELETE",
    });

    if (response.status === 204) {
      return { success: true };
    }

    return response.json();
  },
};

/**
 * Orders API endpoints
 */
export const ordersApi = {
  create: async (orderData: any) => {
    const response = await fetchWithAuth("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getUserOrders: async () => {
    const response = await fetchWithAuth("/orders/me");
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetchWithAuth(`/orders/${id}`);
    return response.json();
  },
};
