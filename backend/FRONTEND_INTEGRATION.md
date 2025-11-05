# 🔗 Frontend Integration Guide

This guide shows how to integrate the BestLife backend API with your Next.js frontend.

## 📧 Contact Form Integration

### Frontend Contact Page Example

Update your `src/app/contact/page.jsx`:

```javascript
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez réessayer.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Contactez-nous</h1>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border-l-4 border-green-500 text-green-700'
              : 'bg-red-50 border-l-4 border-red-500 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Nom complet</label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Sujet</label>
            <input
              type="text"
              required
              value={formData.sujet}
              onChange={(e) => setFormData({...formData, sujet: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-bold py-4 rounded-lg transition"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

## 📰 Newsletter Integration

Add this component to your footer or any page:

```javascript
'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/contact/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Erreur de connexion. Veuillez réessayer.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-2">Newsletter</h3>
      <p className="text-gray-400 mb-4">
        Recevez nos offres exclusives et nouveautés
      </p>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded text-sm ${
          message.type === 'success' 
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="flex-1 px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 rounded-lg"
        >
          {loading ? '...' : "S'abonner"}
        </button>
      </form>
    </div>
  );
}
```

## 🔐 Authentication Integration

### Login Example

```javascript
const handleLogin = async (email, motDePasse) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, motDePasse })
    });

    const data = await response.json();

    if (data.success) {
      // Save token
      localStorage.setItem('token', data.token);
      localStorage.setItem('utilisateur', JSON.stringify(data.data));
      // Redirect to dashboard
      router.push('/');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### Register Example

```javascript
const handleRegister = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('utilisateur', JSON.stringify(data.data));
      router.push('/');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Register error:', error);
  }
};
```

## 🛒 Products Integration

### Fetch All Products

```javascript
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    
    if (data.success) {
      setProducts(data.data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
```

### Fetch Single Product

```javascript
const fetchProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await response.json();
    
    if (data.success) {
      setProduct(data.data);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};
```

## 📦 Orders Integration

### Create Order

```javascript
const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (data.success) {
      alert('Commande créée avec succès!');
      router.push('/commande');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error creating order:', error);
  }
};
```

### Get My Orders

```javascript
const fetchMyOrders = async () => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch('http://localhost:5000/api/orders/myorders', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      setOrders(data.data);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};
```

## 🛡️ Protected Routes

For routes that require authentication, always include the token:

```javascript
const fetchProtectedData = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.push('/login');
    return;
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/protected-endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      // Handle data
    } else if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      router.push('/login');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🌐 API Base URL Configuration

Create a config file: `src/config/api.js`

```javascript
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
```

Then in your `.env.local` (frontend):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📝 Complete Example: API Service

Create `src/services/api.js`:

```javascript
import { API_ENDPOINTS } from '@/config/api';

export const apiService = {
  // Contact
  sendContactMessage: async (data) => {
    const response = await fetch(API_ENDPOINTS.CONTACT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  subscribeNewsletter: async (email) => {
    const response = await fetch(API_ENDPOINTS.NEWSLETTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  // Add more methods as needed...
};
```

## 🎯 Next Steps

1. Replace localStorage authentication with the backend JWT system
2. Update all product fetching to use backend API
3. Implement order creation through backend
4. Add admin dashboard integration
5. Test all API endpoints thoroughly

Happy coding! 🚀
