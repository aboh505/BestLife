'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PanierContext } from '@/context/PanierContext';
import { AuthContext } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { panier, getTotal, viderPanier } = useContext(PanierContext);
  const { utilisateur } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: utilisateur?.email || '',
    prenom: '',
    nom: '',
    telephone: '',
    telephoneProche: '',
    quartier: '',
    typeLivraison: 'domicile',
    ville: 'Douala',
    autreVille: '',
    modePaiement: 'mobile-money',
    adresseFacturation: 'identique',
    emailOffres: false,
    sauvegarderCoordonnees: false
  });

  const [commandeValidee, setCommandeValidee] = useState(false);
  const [showLoginOption, setShowLoginOption] = useState(!utilisateur);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.email || !formData.prenom || !formData.nom || !formData.telephone) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer la commande
    const commande = {
      id: Date.now(),
      date: new Date().toISOString(),
      articles: [...panier],
      total: getTotal() + getFraisExpedition(),
      client: {
        email: formData.email,
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: formData.telephone,
        telephoneProche: formData.telephoneProche,
        quartier: formData.quartier
      },
      livraison: {
        type: formData.typeLivraison,
        ville: formData.ville === 'autre' ? formData.autreVille : formData.ville
      },
      paiement: {
        mode: formData.modePaiement
      },
      statut: 'En attente de paiement'
    };

    // Sauvegarder dans localStorage
    const commandes = JSON.parse(localStorage.getItem('commandes') || '[]');
    commandes.push(commande);
    localStorage.setItem('commandes', JSON.stringify(commandes));

    // Vider le panier
    viderPanier();
    setCommandeValidee(true);
  };

  const getFraisExpedition = () => {
    if (formData.ville === 'Douala') return 1500;
    if (formData.ville === 'Yaoundé') return 2000;
    return 3000;
  };

  if (panier.length === 0 && !commandeValidee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Votre panier est vide</h2>
          <Link href="/produits" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full transition shadow-lg">
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  if (commandeValidee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center border-t-4 border-green-500">
          <div className="text-7xl mb-6">✓</div>
          <h2 className="text-3xl font-bold mb-4 text-green-600">Commande reçue !</h2>
          <p className="text-gray-600 mb-2 text-lg">Merci pour votre commande.</p>
          <p className="text-gray-600 mb-8">Nous vous contacterons sous peu pour confirmer votre commande et organiser la livraison.</p>
          <div className="space-y-3">
            <Link href="/produits" className="block bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-lg transition shadow-lg">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Finaliser la commande</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                {/* Option de connexion */}
                {showLoginOption && (
                  <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700">Vous avez déjà un compte ?</p>
                      <Link href="/login?redirect=/checkout" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                        Se connecter
                      </Link>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Contact */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Contact</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Adresse e-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailOffres"
                          checked={formData.emailOffres}
                          onChange={handleChange}
                          className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Envoyez-moi les offres par e-mail
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Livraison */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Livraison</h2>
                    
                    {/* Type de livraison */}
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="typeLivraison"
                          value="domicile"
                          checked={formData.typeLivraison === 'domicile'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold flex-1">Livraison à domicile</span>
                        <span className="text-gray-500">🚚</span>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="typeLivraison"
                          value="recuperer"
                          checked={formData.typeLivraison === 'recuperer'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold flex-1">Récupérer</span>
                        <span className="text-gray-500">📦</span>
                      </label>
                    </div>

                    {/* Pays/région */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Pays/région</label>
                      <input
                        type="text"
                        value="Cameroun"
                        disabled
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-50"
                      />
                    </div>

                    {/* Nom et Prénom */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="6XX XX XX XX"
                      />
                    </div>

                    {/* Quartier */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Quartier <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="quartier"
                        value={formData.quartier}
                        onChange={handleChange}
                        required
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    {/* Téléphone d'un proche */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Numéro de téléphone d'un proche
                      </label>
                      <input
                        type="tel"
                        name="telephoneProche"
                        value={formData.telephoneProche}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="6XX XX XX XX"
                      />
                    </div>

                    {/* Sauvegarder coordonnées */}
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        name="sauvegarderCoordonnees"
                        checked={formData.sauvegarderCoordonnees}
                        onChange={handleChange}
                        className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Sauvegarder mes coordonnées pour mes prochaines commandes
                      </label>
                    </div>
                  </div>

                  {/* Mode d'expédition */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Mode d'expédition</h2>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="ville"
                            value="Douala"
                            checked={formData.ville === 'Douala'}
                            onChange={handleChange}
                            className="w-5 h-5 text-amber-500"
                          />
                          <span className="ml-3 font-semibold">Douala</span>
                        </div>
                        <span className="font-bold">1 500 FCFA</span>
                      </label>
                      <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="ville"
                            value="Yaoundé"
                            checked={formData.ville === 'Yaoundé'}
                            onChange={handleChange}
                            className="w-5 h-5 text-amber-500"
                          />
                          <span className="ml-3 font-semibold">Yaoundé</span>
                        </div>
                        <span className="font-bold">2 000 FCFA</span>
                      </label>
                      <label className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="ville"
                            value="autre"
                            checked={formData.ville === 'autre'}
                            onChange={handleChange}
                            className="w-5 h-5 text-amber-500"
                          />
                          <span className="ml-3 font-semibold">Autre ville</span>
                        </div>
                        <span className="font-bold">3 000 FCFA</span>
                      </label>
                    </div>
                    {formData.ville === 'autre' && (
                      <input
                        type="text"
                        name="autreVille"
                        value={formData.autreVille}
                        onChange={handleChange}
                        placeholder="Précisez la ville"
                        className="w-full mt-3 border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    )}
                  </div>

                  {/* Paiement */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Paiement</h2>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="modePaiement"
                          value="mobile-money"
                          checked={formData.modePaiement === 'mobile-money'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold">Mobile Money (MTN/Orange)</span>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="modePaiement"
                          value="cash"
                          checked={formData.modePaiement === 'cash'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold">Paiement à la livraison</span>
                      </label>
                    </div>
                  </div>

                  {/* Adresse de facturation */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Adresse de facturation</h2>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="adresseFacturation"
                          value="identique"
                          checked={formData.adresseFacturation === 'identique'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold">Identique à l'adresse de livraison</span>
                      </label>
                      <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition">
                        <input
                          type="radio"
                          name="adresseFacturation"
                          value="differente"
                          checked={formData.adresseFacturation === 'differente'}
                          onChange={handleChange}
                          className="w-5 h-5 text-amber-500"
                        />
                        <span className="ml-3 font-semibold">Utiliser une adresse de facturation différente</span>
                      </label>
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition transform hover:scale-105 text-lg shadow-lg"
                  >
                    Passer la commande
                  </button>
                </form>
              </div>
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Résumé</h2>
                
                {/* Articles */}
                <div className="space-y-4 mb-6">
                  {panier.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <div className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold z-10">
                          {item.quantite}
                        </div>
                        {item.image ? (
                          <Image 
                            src={item.image} 
                            alt={item.nom}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="text-2xl">📱</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{item.nom}</h3>
                        <p className="text-xs text-gray-600">{item.marque}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{(item.prix * item.quantite).toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Sous-total · {panier.length} article(s)</span>
                    <span className="font-bold">{getTotal().toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Expédition</span>
                    <span className="font-bold">{getFraisExpedition().toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 font-normal">XAF</div>
                      <div className="text-amber-600">{(getTotal() + getFraisExpedition()).toLocaleString('fr-FR')} FCFA</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Taxes de 0 FCFA incluses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
