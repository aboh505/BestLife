'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const [openGeneral, setOpenGeneral] = useState(null);
  const [openFrequent, setOpenFrequent] = useState(null);

  const generalQuestions = [
    {
      id: 1,
      question: "Comment puis-je passer une commande ?",
      answer: "Pour passer une commande, parcourez notre catalogue de produits, ajoutez les articles souhaités à votre panier, puis cliquez sur 'Passer la commande'. Vous devrez créer un compte ou vous connecter pour finaliser votre achat."
    },
    {
      id: 2,
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés et cryptés."
    },
    {
      id: 3,
      question: "Quels sont les délais de livraison ?",
      answer: "La livraison standard prend généralement 2-3 jours ouvrables en France métropolitaine. La livraison express (24h) est également disponible moyennant un supplément."
    },
    {
      id: 4,
      question: "Comment contacter le support client ?",
      answer: "Vous pouvez nous contacter par email à contact@bestlife.com, par téléphone au +237 2 42 21 30 28 (du lundi au vendredi, 9h-18h), ou via notre formulaire de contact."
    },
    {
      id: 5,
      question: "Quels sont les frais de livraison ?",
      answer: "La livraison est GRATUITE pour toutes les commandes . Pour les DOM-TOM et l'international, des frais supplémentaires peuvent s'appliquer."
    },
    {
      id: 6,
      question: "Comment suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email avec un numéro de suivi. Vous pouvez également consulter l'état de vos commandes dans votre espace client."
    },
    {
      id: 7,
      question: "Puis-je modifier ma commande après validation ?",
      answer: "Vous pouvez modifier votre commande dans les 2 heures suivant la validation en contactant notre service client. Passé ce délai, la commande est en cours de préparation."
    },
    {
      id: 8,
      question: "Quelle est la garantie des produits ?",
      answer: "Tous nos smartphones bénéficient de la garantie constructeur (généralement 2 ans). Nous offrons également une garantie satisfait ou remboursé de 30 jours."
    }
  ];

  const frequentQuestions = [
    {
      id: 1,
      question: "Les téléphones sont-ils neufs ou reconditionnés ?",
      answer: "Tous nos téléphones sont 100% neufs, jamais ouverts, avec emballage d'origine scellé. Nous ne vendons pas de produits reconditionnés."
    },
    {
      id: 2,
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 30 jours pour retourner un produit non utilisé dans son emballage d'origine. Le remboursement est effectué sous 5-7 jours ouvrables après réception du retour."
    },
    {
      id: 3,
      question: "Les téléphones sont-ils débloqués ?",
      answer: "Oui, tous nos smartphones sont débloqués tous opérateurs et peuvent être utilisés avec n'importe quelle carte SIM française ou internationale."
    },
    {
      id: 4,
      question: "Proposez-vous des accessoires ?",
      answer: "Actuellement, nous nous concentrons exclusivement sur les smartphones premium. Les accessoires (coques, chargeurs, écouteurs) seront disponibles prochainement."
    },
    {
      id: 5,
      question: "Comment bénéficier des promotions ?",
      answer: "Les promotions sont automatiquement appliquées lors de l'ajout au panier. Inscrivez-vous à notre newsletter pour être informé en avant-première de nos offres exclusives."
    },
    {
      id: 6,
      question: "Puis-je payer en plusieurs fois ?",
      answer: "Oui, le paiement en 3x ou 4x sans frais est disponible pour toute commande. L'option vous sera proposée lors du paiement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-black rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-black/20 backdrop-blur-sm px-6 py-2 rounded-full text-black text-sm font-bold mb-6">
            SUPPORT
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">Questions Générales</h1>
          <p className="text-black/80 text-lg max-w-2xl mx-auto font-medium">
            Vous avez des questions sur nos services, la livraison ou les garanties ? 
            Nous sommes là pour vous aider à trouver les réponses dont vous avez besoin.
          </p>
        </div>
      </div>

      {/* General Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {generalQuestions.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                <button
                  onClick={() => setOpenGeneral(openGeneral === item.id ? null : item.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-yellow-600 font-bold text-lg">{item.id}.</span>
                    <span className="font-bold text-gray-900">{item.question}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openGeneral === item.id ? 'bg-yellow-500 rotate-45' : 'bg-yellow-100'
                  }`}>
                    <span className="text-xl font-bold text-black">+</span>
                  </div>
                </button>
                {openGeneral === item.id && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="pl-8 text-gray-600 leading-relaxed border-l-4 border-yellow-500 pl-6">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-center my-12">
          <div className="h-px  flex-1"></div>
          <div className="px-6">
            <div className="bg-yellow-100 text-yellow-800 px-6 py-2 rounded-full text-sm font-bold">
              QUESTIONS FRÉQUENTES
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Questions Fréquemment Posées</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vous avez des questions sur nos produits, les garanties ou les retours ? 
              Consultez nos réponses aux questions les plus fréquentes.
            </p>
          </div>

          <div className="space-y-4">
            {frequentQuestions.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <button
                  onClick={() => setOpenFrequent(openFrequent === item.id ? null : item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-yellow-600 font-bold text-lg">{item.id}.</span>
                    <span className="font-bold text-gray-900">{item.question}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    openFrequent === item.id ? 'bg-yellow-500 rotate-45' : 'bg-yellow-100'
                  }`}>
                    <span className="text-2xl font-bold text-black">+</span>
                  </div>
                </button>
                {openFrequent === item.id && (
                  <div className="px-6 pb-6">
                    <div className="pl-10 text-gray-600 leading-relaxed border-l-4 border-yellow-500 pl-6">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

  <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-yellow-400 text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
              <p className="text-gray-400">Rendre les smartphones premium accessibles à tous.</p>
            </div>
            <div>
              <div className="text-yellow-400 text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-4">Notre Vision</h3>
              <p className="text-gray-400">Devenir la référence pour l'achat de smartphones premium.</p>
            </div>
            <div>
              <div className="text-yellow-400 text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4">Nos Valeurs</h3>
              <p className="text-gray-400">Excellence, Innovation, Transparence et Satisfaction Client.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
