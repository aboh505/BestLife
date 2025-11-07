'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_ENDPOINTS } from '@/config/api';

export default function ProduitsPage() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('tous');
  const [sousCategorie, setSousCategorie] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS);
      const data = await response.json();
      
      if (data.success) {
        setProduits(data.data);
      } else {
        console.error('Error loading products:', data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">Nos Produits</h1>
          <p className="text-amber-100 text-lg">
            {categorieSelectionnee === 'smartphone' && 'Découvrez notre sélection de smartphones premium'}
            {categorieSelectionnee === 'electronique' && 'Explorez nos appareils électroniques,Distributeur d’appareils utiles pour le confort quotidien '}
            {categorieSelectionnee === 'immobilier' && 'Trouvez votre bien immobilier idéal'}
            {categorieSelectionnee === 'bien-etre' && 'Nous proposons des produits naturels pour aider à renforcer la santé, réduire le stress, améliorer le sommeil et favoriser un mode de vie équilibré'}
            {categorieSelectionnee === 'meubles' && 'Explorez nos Meubles fonctionnels et design pour la maison ou le bureau'}
            {categorieSelectionnee === 'lifestyle' && 'Trouvez votre confort et style de vie idéal'}
            {categorieSelectionnee === 'electromenagers' && 'Découvrez nos électroménagers de qualité'}
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
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Tous les produits
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('smartphone'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'smartphone' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Smartphones
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('electronique'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'electronique' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Appareils électroniques
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('immobilier'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'immobilier' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Immobilier
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('bien-etre'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'bien-etre' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Bien-être & Santé naturelle
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('meubles'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'meubles' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Meubles & Décoration intérieure
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('lifestyle'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'lifestyle' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Lifestyle & Confort
                  </button>
                  <button
                    onClick={() => { setCategorieSelectionnee('electromenagers'); setSousCategorie(''); }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                      categorieSelectionnee === 'electromenagers' 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Électroménagers
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
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Toutes les marques</option>
                    {marquesSmartphone.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}

              <button 
                onClick={() => { setCategorieSelectionnee('tous'); setSousCategorie(''); }}
                className="w-full mt-6 bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded-lg font-semibold transition shadow-md"
              >
                Réinitialiser
              </button>
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-700 font-semibold">{produitsFiltres.length} produit(s) trouvé(s)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {produitsFiltres.map(produit => (
                    <Link href={`/produits/${produit._id}`} key={produit._id}>
                      <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-64 bg-gray-100">
                          <Image 
                            src={produit.image} 
                            alt={produit.nom} 
                            fill 
                            className="object-contain p-4 group-hover:scale-110 transition duration-300"
                            unoptimized={produit.image?.startsWith('http')}
                          />
                        </div>
                    <div className="p-6">
                      <div className="text-xs text-amber-600 font-bold mb-1 uppercase">{produit.marque}</div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{produit.nom}</h3>
                      <p className="text-gray-600 text-sm mb-4">{produit.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {produit.ancienPrix && (
                            <span className="text-sm text-red-500 line-through font-semibold block">{produit.ancienPrix.toLocaleString()} CFA</span>
                          )}
                          <span className="text-3xl font-bold text-amber-600">{produit.prix.toLocaleString()} CFA</span>
                        </div>
                        <span className="text-sm text-green-600 font-semibold">{produit.stock} en stock</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
