'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { PanierContext } from '@/context/PanierContext';

export default function CommandePage() {
  const router = useRouter();
  const { utilisateur } = useContext(AuthContext);
  const { panier, getTotal, viderPanier } = useContext(PanierContext);
  const [commandes, setCommandes] = useState([]);
  const [commandeEnCours, setCommandeEnCours] = useState(false);

  useEffect(() => {
    if (!utilisateur) {
      router.push('/login?redirect=/commande');
      return;
    }
    const commandesStockees = localStorage.getItem(`commandes_${utilisateur.email}`);
    if (commandesStockees) {
      setCommandes(JSON.parse(commandesStockees));
    }
  }, [utilisateur, router]);

  const passerCommande = () => {
    if (panier.length === 0) return;
    const nouvelleCommande = {
      id: Date.now(),
      date: new Date().toISOString(),
      articles: [...panier],
      total: getTotal(),
      statut: 'En préparation'
    };
    const nouvellesCommandes = [nouvelleCommande, ...commandes];
    setCommandes(nouvellesCommandes);
    localStorage.setItem(`commandes_${utilisateur.email}`, JSON.stringify(nouvellesCommandes));
    viderPanier();
    setCommandeEnCours(true);
  };

  if (!utilisateur) return null;

  if (commandeEnCours) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center border-t-4 border-yellow-500">
          <div className="text-7xl mb-6">✓</div>
          <h2 className="text-3xl font-bold mb-4 text-green-600">Commande confirmée !</h2>
          <p className="text-gray-600 mb-8 text-lg">Merci pour votre achat. Vous recevrez un email de confirmation.</p>
          <div className="space-y-3">
            <Link href="/commande" className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-6 rounded-lg transition">
              Voir mes commandes
            </Link>
            <Link href="/produits" className="block text-yellow-600 hover:text-yellow-700 font-bold">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (panier.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">Confirmer la commande</h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-t-4 border-yellow-500">
            <h2 className="font-bold text-2xl mb-6">Récapitulatif</h2>
            {panier.map(item => (
              <div key={item.id} className="flex justify-between py-3 border-b">
                <span className="font-semibold">{item.nom} x{item.quantite}</span>
                <span className="font-bold text-lg">{(item.prix * item.quantite).toFixed(2)}€</span>
              </div>
            ))}
            <div className="flex justify-between pt-6 text-2xl font-bold">
              <span>Total</span>
              <span className="text-yellow-600">{getTotal().toFixed(2)}€</span>
            </div>
          </div>
          <button onClick={passerCommande} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition transform hover:scale-105">
            Confirmer et payer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Mes Commandes</h1>
        {commandes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 mb-6 text-lg">Aucune commande pour le moment</p>
            <Link href="/produits" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {commandes.map(commande => (
              <div key={commande.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-8">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-xl">Commande #{commande.id}</h3>
                    <p className="text-sm text-gray-600 mt-1">{new Date(commande.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold h-fit">{commande.statut}</span>
                </div>
                <div className="space-y-2 mb-6">
                  {commande.articles.map(article => (
                    <div key={article.id} className="text-gray-700 font-medium">{article.nom} x{article.quantite}</div>
                  ))}
                </div>
                <div className="text-right font-bold text-2xl text-yellow-600">Total: {commande.total.toFixed(2)}€</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
