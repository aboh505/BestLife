'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous');
  const [sousCategorie, setSousCategorie] = useState('');

  useEffect(() => {
    const produitsDemo = [
      // Smartphones
      { id: 1, nom: 'iPhone 15 Pro', marque: 'Apple', categorie: 'smartphone', prix: 786350, ancienPrix: 920000, description: 'Le dernier iPhone avec puce A17 Pro', stock: 15, image: '/i1.jpg' },
      { id: 2, nom: 'Samsung Galaxy S24 Ultra', marque: 'Samsung', categorie: 'smartphone', prix: 852000, ancienPrix: 1050000, description: 'Smartphone premium avec S Pen', stock: 20, image: '/s1.jpg' },
      { id: 3, nom: 'Google Pixel 8 Pro', marque: 'Google', categorie: 'smartphone', prix: 655350, ancienPrix: 780000, description: 'Meilleure photographie IA', stock: 12, image: '/p1.jpg' },
      { id: 4, nom: 'OnePlus 12', marque: 'OnePlus', categorie: 'smartphone', prix: 524350, ancienPrix: 650000, description: 'Performance et charge rapide', stock: 18, image: '/o1.jpg' },
      { id: 5, nom: 'Xiaomi 14 Pro', marque: 'Xiaomi', categorie: 'smartphone', prix: 590000, ancienPrix: 720000, description: 'Excellent rapport qualité-prix', stock: 25, image: '/x1.jpg' },
      { id: 6, nom: 'iPhone 14', marque: 'Apple', categorie: 'smartphone', prix: 524350, ancienPrix: 650000, description: 'iPhone fiable et performant', stock: 30, image: '/i1.jpg' },
      
      // Électronique
      { id: 7, nom: 'MacBook Pro 16"', marque: 'Apple', categorie: 'electronique', prix: 1500000, ancienPrix: 1800000, description: 'Ordinateur portable professionnel', stock: 8, image: '/' },
      { id: 8, nom: 'iPad Air', marque: 'Apple', categorie: 'electronique', prix: 450000, ancienPrix: 550000, description: 'Tablette polyvalente', stock: 12, image: '/' },
      { id: 9, nom: 'AirPods Pro', marque: 'Apple', categorie: 'electronique', prix: 180000, ancienPrix: 220000, description: 'Écouteurs sans fil premium', stock: 25, image: '/' },
      { id: 10, nom: 'Samsung Smart TV 55"', marque: 'Samsung', categorie: 'electronique', prix: 650000, ancienPrix: 800000, description: 'Télévision 4K intelligente', stock: 10, image: '/' },
      
      // Immobilier
      { id: 11, nom: 'Villa Moderne Douala', marque: 'Immobilier', categorie: 'immobilier', prix: 85000000, ancienPrix: 95000000, description: 'Villa 4 chambres avec piscine', stock: 1, image: '/' },
      { id: 12, nom: 'Appartement Centre-ville', marque: 'Immobilier', categorie: 'immobilier', prix: 35000000, ancienPrix: 40000000, description: 'Appartement 3 pièces meublé', stock: 2, image: '/' },
      { id: 13, nom: 'Terrain Constructible', marque: 'Immobilier', categorie: 'immobilier', prix: 15000000, ancienPrix: 18000000, description: 'Terrain 500m² viabilisé', stock: 3, image: '/' }
    ];
    setProduits(produitsDemo);
  }, []);

  // Obtenir les marques de smartphones uniquement
  const marquesSmartphone = [...new Set(produits.filter(p => p.categorie === 'smartphone').map(p => p.marque))];
  
  // Filtrer les produits
  let produitsFiltres = produits;
  
  if (categorieSelectionnee !== 'tous') {
    produitsFiltres = produitsFiltres.filter(p => p.categorie === categorieSelectionnee);
  }
  
  if (sousCategorie && categorieSelectionnee === 'smartphone') {
    produitsFiltres = produitsFiltres.filter(p => p.marque === sousCategorie);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-400 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">Nos Produits</h1>
          <p className="text-yellow-400 text-lg">
            {categorieSelectionnee === 'smartphone' && 'Découvrez notre sélection de smartphones premium'}
            {categorieSelectionnee === 'electronique' && 'Explorez nos produits électroniques'}
            {categorieSelectionnee === 'immobilier' && 'Trouvez votre bien immobilier idéal'}
            {categorieSelectionnee === 'tous' && 'Découvrez tous nos produits'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="font-bold text-xl mb-6">Catégories</h3>
              
              {/* Filtre par catégorie principale */}
              <div className="mb-6">
               
                <div className="space-y-2">
                  <button
                    onClick={() => { setCategorieSelectionnee('tous'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'tous' 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {/* 📦 Tous les produits */}
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('smartphone'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'smartphone' 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                     Smartphones
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('electronique'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'electronique' 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Électronique
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('immobilier'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'immobilier' 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Immobilier
                  </button>
                </div>
              </div>

              {/* Filtre par marque (uniquement pour smartphones) */}
              {categorieSelectionnee === 'smartphone' && (
                <div className="mb-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium mb-3 text-gray-700">Marque</label>
                  <select 
                    value={sousCategorie} 
                    onChange={(e) => setSousCategorie(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Toutes les marques</option>
                    {marquesSmartphone.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}

              <button 
                onClick={() => { setCategorieSelectionnee('tous'); setSousCategorie(''); }}
                className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
              >
                Réinitialiser
              </button>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-700 font-semibold">{produitsFiltres.length} produit(s) trouvé(s)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {produitsFiltres.map(produit => (
                <Link href={`/produits/${produit.id}`} key={produit.id}>
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="relative h-64 bg-gray-100">
                      <Image src={produit.image} alt={produit.nom} fill className="object-contain p-4 group-hover:scale-110 transition duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-yellow-600 font-bold mb-1 uppercase">{produit.marque}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{produit.nom}</h3>
                      <p className="text-gray-600 text-sm mb-4">{produit.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {produit.ancienPrix && (
                            <span className="text-sm text-red-500 line-through font-semibold block">{produit.ancienPrix.toLocaleString()} CFA</span>
                          )}
                          <span className="text-3xl font-bold text-black">{produit.prix.toLocaleString()} CFA</span>
                        </div>
                        <span className="text-sm text-green-600 font-semibold">{produit.stock} en stock</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
