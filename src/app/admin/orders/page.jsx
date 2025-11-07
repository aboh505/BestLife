'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { API_ENDPOINTS } from '@/config/api';
import { Eye, Filter, Package } from 'lucide-react';

export default function OrdersManagement() {
  const { getToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = getToken();
      const response = await fetch(API_ENDPOINTS.ORDERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = getToken();
    try {
      const response = await fetch(`${API_ENDPOINTS.ORDER(orderId)}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ statut: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(data.data);
        }
        alert('Statut mis à jour avec succès!');
      } else {
        alert(data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.statut === filterStatus);

  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'En préparation', label: 'En préparation', color: 'bg-yellow-500' },
    { value: 'Expédiée', label: 'Expédiée', color: 'bg-blue-500' },
    { value: 'Livrée', label: 'Livrée', color: 'bg-green-500' },
    { value: 'Annulée', label: 'Annulée', color: 'bg-red-500' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Commandes</h1>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statusOptions.filter(s => s.value !== 'all').map((status) => {
          const count = orders.filter(o => o.statut === status.value).length;
          return (
            <div key={status.value} className="bg-white rounded-lg shadow-md p-4">
              <div className={`${status.color} w-12 h-12 rounded-full flex items-center justify-center mb-2`}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600">{status.label}</p>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      #{order._id.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.utilisateur?.prenom} {order.utilisateur?.nom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.utilisateur?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.articles?.length} article(s)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {order.total?.toLocaleString()} FCFA
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.statut}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer ${
                        order.statut === 'Livrée' ? 'bg-green-100 text-green-800' :
                        order.statut === 'Expédiée' ? 'bg-blue-100 text-blue-800' :
                        order.statut === 'Annulée' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <option value="En préparation">En préparation</option>
                      <option value="Expédiée">Expédiée</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Détails de la commande #{selectedOrder._id.slice(-8)}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Informations Client</h3>
                <p className="text-sm text-gray-700">
                  <strong>Nom:</strong> {selectedOrder.utilisateur?.prenom} {selectedOrder.utilisateur?.nom}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {selectedOrder.utilisateur?.email}
                </p>
              </div>

              {/* Delivery Address */}
              {selectedOrder.adresseLivraison && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Adresse de livraison</h3>
                  <p className="text-sm text-gray-700">{selectedOrder.adresseLivraison.rue}</p>
                  <p className="text-sm text-gray-700">
                    {selectedOrder.adresseLivraison.ville}, {selectedOrder.adresseLivraison.codePostal}
                  </p>
                  {selectedOrder.adresseLivraison.telephone && (
                    <p className="text-sm text-gray-700">
                      <strong>Tél:</strong> {selectedOrder.adresseLivraison.telephone}
                    </p>
                  )}
                </div>
              )}

              {/* Products */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Produits commandés</h3>
                <div className="space-y-3">
                  {selectedOrder.articles?.map((article, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{article.nom}</p>
                        <p className="text-sm text-gray-600">Quantité: {article.quantite}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {(article.prix * article.quantite).toLocaleString()} FCFA
                        </p>
                        <p className="text-sm text-gray-600">
                          {article.prix.toLocaleString()} FCFA / unité
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {selectedOrder.total?.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Status Update */}
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <label className="block text-sm font-bold mb-2">Modifier le statut</label>
                <select
                  value={selectedOrder.statut}
                  onChange={(e) => {
                    updateOrderStatus(selectedOrder._id, e.target.value);
                  }}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="En préparation">En préparation</option>
                  <option value="Expédiée">Expédiée</option>
                  <option value="Livrée">Livrée</option>
                  <option value="Annulée">Annulée</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
