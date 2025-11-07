'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PanierContext } from '@/context/PanierContext';
import { AuthContext } from '@/context/AuthContext';

export default function PanierPage() {
  const router = useRouter();
  const { panier, retirerDuPanier, modifierQuantite, viderPanier, getTotal } = useContext(PanierContext);
  const { utilisateur } = useContext(AuthContext);

  const handleCommander = () => {
    // Rediriger vers le formulaire de commande, connecté ou non
    router.push('/checkout');
  };

  if (panier.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Votre panier est vide</h2>
          <p className="text-gray-600 mb-8 text-lg">Découvrez nos produits et ajoutez-les à votre panier</p>
          <Link href="/produits" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full transition transform hover:scale-105 shadow-lg">
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">Mon Panier</h1>
          <p className="text-amber-100 text-lg">{panier.length} article(s) dans votre panier</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {panier.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6">
                <div className="flex gap-6">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.nom}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-4xl">📱</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <Link href={`/produits/${item.id}`}>
                          <h3 className="font-bold text-xl hover:text-amber-600 cursor-pointer transition">{item.nom}</h3>
                        </Link>
                        <p className="text-sm text-gray-600 font-semibold">{item.marque}</p>
                      </div>
                      <button onClick={() => retirerDuPanier(item.id)} className="text-red-500 hover:text-red-700 h-fit transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg">
                        <button onClick={() => modifierQuantite(item.id, item.quantite - 1)} className="px-4 py-2 hover:bg-gray-100 font-bold transition">-</button>
                        <span className="px-6 py-2 border-x-2 border-gray-200 font-bold">{item.quantite}</span>
                        <button onClick={() => modifierQuantite(item.id, item.quantite + 1)} className="px-4 py-2 hover:bg-gray-100 font-bold transition">+</button>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{item.prix.toLocaleString('fr-FR')} FCFA × {item.quantite}</div>
                        <div className="text-2xl font-bold text-black">{(item.prix * item.quantite).toLocaleString('fr-FR')} FCFA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={viderPanier} className="text-red-600 hover:text-red-700 font-bold transition">🗑️ Vider le panier</button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-4 border-t-4 border-amber-500">
              <h2 className="text-2xl font-bold mb-6">Résumé</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total</span>
                  <span className="font-bold">{getTotal().toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span className="text-green-600 font-bold">Gratuite</span>
                </div>
                <div className="border-t-2 pt-4 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">{getTotal().toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
              <button onClick={handleCommander} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg mb-4 transition transform hover:scale-105 shadow-lg">
                Passer la commande
              </button>
              <Link href="/produits" className="block text-center text-gray-700 hover:text-amber-600 font-semibold transition">
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
