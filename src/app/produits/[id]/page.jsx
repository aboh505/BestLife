'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PanierContext } from '@/context/PanierContext';
import { API_ENDPOINTS } from '@/config/api';

export default function DetailProduitPage() {
  const params = useParams();
  const { ajouterAuPanier } = useContext(PanierContext);
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT(params.id));
      const data = await response.json();
      
      if (data.success) {
        setProduit(data.data);
      } else {
        console.error('Product not found:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAjouterPanier = () => {
    if (produit) {
      ajouterAuPanier(produit, 1);
      setMessage('✓ Produit ajouté au panier !');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Link href="/produits" className="text-blue-600 hover:underline">Retour aux produits</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-yellow-400">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/produits" className="hover:text-yellow-400">Produits</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{produit.nom}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-96 relative overflow-hidden">
              <Image 
                src={produit.image} 
                alt={produit.nom} 
                fill
                className="object-contain p-8"
                unoptimized={produit.image?.startsWith('http')}
              />
            </div>

            <div>
              <div className="text-sm text-yellow-600 font-bold mb-2 uppercase">{produit.marque}</div>
              <h1 className="text-3xl font-bold mb-4">{produit.nom}</h1>
              <div className="flex items-center mb-6">
                <div>
                  {produit.ancienPrix && (
                    <span className="text-lg text-red-500 line-through font-semibold block">
                      {produit.ancienPrix.toLocaleString()} CFA
                    </span>
                  )}
                  <span className="text-4xl font-bold text-black">{produit.prix.toLocaleString()} CFA</span>
                </div>
                <span className="ml-4 px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 font-bold">
                  {produit.stock} en stock
                </span>
              </div>
              <p className="text-gray-700 mb-6">{produit.descriptionLongue}</p>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Caractéristiques principales</h3>
                <ul className="space-y-2">
                  {produit.caracteristiques.map((carac, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-2">✓</span>{carac}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-6">
                <button onClick={handleAjouterPanier} disabled={produit.stock === 0}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black font-bold py-4 rounded-lg transition transform hover:scale-105 mb-4">
                  {produit.stock > 0 ? ' Ajouter au panier' : 'Rupture de stock'}
                </button>
                {message && (
                  <div className="mt-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded font-semibold">{message}</div>
                )}
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Vous pourrez modifier la quantité dans votre panier
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
