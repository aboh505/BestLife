'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';

export default function ProfilPage() {
  const router = useRouter();
  const { utilisateur, deconnexion } = useContext(AuthContext);

  useEffect(() => {
    if (!utilisateur) {
      router.push('/login');
    }
  }, [utilisateur, router]);

  if (!utilisateur) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">Mon Profil</h1>
          <p className="text-yellow-400 text-lg">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-black font-bold">{utilisateur.prenom[0]}{utilisateur.nom[0]}</span>
                </div>
                <h2 className="text-xl font-bold">{utilisateur.prenom} {utilisateur.nom}</h2>
                <p className="text-gray-600 text-sm">{utilisateur.email}</p>
              </div>
              <div className="space-y-2">
                <Link href="/profil" className="block px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg font-semibold">
                  📋 Informations
                </Link>
                <Link href="/commande" className="block px-4 py-3 hover:bg-gray-50 rounded-lg font-semibold transition">
                  📦 Mes commandes
                </Link>
                <button onClick={deconnexion} className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg font-semibold transition">
                  🚪 Déconnexion
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                    <div className="border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                      {utilisateur.prenom}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                    <div className="border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                      {utilisateur.nom}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <div className="border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                    {utilisateur.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rôle</label>
                  <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold text-sm">
                    {utilisateur.role === 'admin' ? '👑 Administrateur' : '👤 Client'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Membre depuis</label>
                  <div className="border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                    {new Date(utilisateur.dateInscription).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-bold mb-4">Actions rapides</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/commande" className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg text-center transition">
                    Voir mes commandes
                  </Link>
                  <Link href="/produits" className="block bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-center transition">
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
