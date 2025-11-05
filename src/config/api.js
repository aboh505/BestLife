// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  ME: `${API_BASE_URL}/api/auth/me`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/api/orders`,
  MY_ORDERS: `${API_BASE_URL}/api/orders/myorders`,
  ORDER: (id) => `${API_BASE_URL}/api/orders/${id}`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
  NEWSLETTER: `${API_BASE_URL}/api/contact/newsletter`,
  
  // Admin
  DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
  USERS: `${API_BASE_URL}/api/users`,
};

export default API_BASE_URL;
