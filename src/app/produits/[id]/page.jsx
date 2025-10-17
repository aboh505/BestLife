'use client';

import { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PanierContext } from '@/context/PanierContext';

export default function DetailProduitPage() {
  const params = useParams();
  const { ajouterAuPanier } = useContext(PanierContext);
  const [produit, setProduit] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const produitsDemo = [
      { id: 1, nom: 'iPhone 15 Pro', marque: 'Apple', prix: 786350, ancienPrix: 920000, description: 'Le dernier iPhone avec puce A17 Pro', 
        descriptionLongue: 'L\'iPhone 15 Pro redéfinit ce qu\'un smartphone peut faire avec sa puce A17 Pro révolutionnaire.',
        stock: 15, image: '/i1.jpg', caracteristiques: ['Écran Super Retina XDR 6.1"', 'Puce A17 Pro', 'Triple caméra 48MP', '128GB', '5G', 'Face ID'] },
      { id: 2, nom: 'Samsung Galaxy S25 Ultra', marque: 'Samsung', prix: 852000, ancienPrix: 1050000, description: 'Smartphone premium avec S Pen',
        descriptionLongue: 'Le Galaxy S25 Ultra est le summum de l\'innovation Samsung avec son S Pen intégré.',
        stock: 20, image: '/s1.jpg', caracteristiques: ['Écran Dynamic AMOLED 6.8"', 'Snapdragon 8 Gen 3', 'Quad caméra 200MP', '256GB', 'S Pen', '5G'] },
      { id: 3, nom: 'Google Pixel 8 Pro', marque: 'Google', prix: 655350, ancienPrix: 780000, description: 'Meilleure photographie IA',
        descriptionLongue: 'Le Pixel 8 Pro offre la meilleure expérience Android pure avec des fonctionnalités IA révolutionnaires.',
        stock: 12, image: '/p1.jpg', caracteristiques: ['Écran LTPO OLED 6.7"', 'Google Tensor G3', 'Triple caméra 50MP', '128GB', 'Magic Eraser', '5G'] },
      { id: 4, nom: 'OnePlus 12', marque: 'OnePlus', prix: 524350, ancienPrix: 650000, description: 'Performance et charge rapide',
        descriptionLongue: 'Le OnePlus 12 combine performance de pointe et charge ultra-rapide.',
        stock: 18, image: '/o1.jpg', caracteristiques: ['Écran AMOLED 6.7"', 'Snapdragon 8 Gen 3', 'Triple caméra Hasselblad 50MP', '256GB', 'Charge 100W', '5G'] },
      { id: 5, nom: 'Xiaomi 14 Pro', marque: 'Xiaomi', prix: 590000, ancienPrix: 720000, description: 'Excellent rapport qualité-prix',
        descriptionLongue: 'Le Xiaomi 14 Pro offre des spécifications flagship à un prix accessible.',
        stock: 25, image: '/x1.jpg', caracteristiques: ['Écran AMOLED 6.73"', 'Snapdragon 8 Gen 3', 'Triple caméra Leica 50MP', '256GB', 'Charge 120W', '5G'] },
      { id: 6, nom: 'iPhone 14', marque: 'Apple', prix: 524350, ancienPrix: 650000, description: 'iPhone fiable et performant',
        descriptionLongue: 'L\'iPhone 14 reste un excellent choix avec sa puce A15 Bionic éprouvée.',
        stock: 30, image: '/i1.jpg', caracteristiques: ['Écran Super Retina XDR 6.1"', 'Puce A15 Bionic', 'Double caméra 12MP', '128GB', '5G', 'Face ID'] }
    ];
    const produitTrouve = produitsDemo.find(p => p.id === parseInt(params.id));
    setProduit(produitTrouve);
  }, [params.id]);

  const handleAjouterPanier = () => {
    if (produit) {
      ajouterAuPanier(produit, 1);
      setMessage('✓ Produit ajouté au panier !');
      setTimeout(() => setMessage(''), 3000);
    }
  };

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
                  💡 Vous pourrez modifier la quantité dans votre panier
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
