'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: 'Smartphones Premium',
      subtitle: 'iPhone 15 Pro Max',
      image: '/hero1.jpg',
      buttonText: 'Découvrir'
    },
    {
      title: 'Dernières Nouveautés',
      subtitle: 'Collection 2025',
      image: '/hero2.jpg',
      buttonText: 'Voir Collection'
    },
    {
      title: 'Électronique Moderne',
      subtitle: 'Technologie de pointe',
      image: '/col1.jpg',
      buttonText: 'Explorer'
    },
    {
      title: 'Immobilier de Luxe',
      subtitle: 'Votre maison de rêve',
      image: '/col2.jpg',
      buttonText: 'Découvrir'
    }
  ];

  const nouveautes = [
    { 
      id: 1, 
      nom: 'iPhone 15 Pro', 
      prix: 786350, 
      ancienPrix: 920000,
      marque: 'APPLE',
      image: '/i1.jpg',
      badge: 'Best Seller',
      colors: ['#000000', '#FFFFFF', '#0000FF']
    },
    { 
      id: 2, 
      nom: 'Galaxy S25 Ultra', 
      prix: 852000, 
      ancienPrix: 1050000,
      marque: 'SAMSUNG',
      image: '/s1.jpg',
      badge: 'Nouveau',
      colors: ['#000000', '#808080']
    },
    { 
      id: 3, 
      nom: 'Pixel 8 Pro', 
      prix: 655350, 
      ancienPrix: 780000,
      marque: 'GOOGLE',
      image: '/p1.jpg',
      badge: 'Promo -15%',
      colors: ['#000000', '#FFFFFF', '#87CEEB']
    },
    { 
      id: 4, 
      nom: 'OnePlus 12', 
      prix: 524350, 
      ancienPrix: 650000,
      marque: 'ONEPLUS',
      image: '/o1.jpg',
      colors: ['#000000', '#008000']
    }
  ];

  const collections = [
    { 
      title: 'Premium Collection', 
      image: '/e1.jpg',
      link: '/produits?filter=premium'
    },
    { 
      title: 'Gaming Phones', 
      image: '/e2.jpg',
      link: '/produits?filter=gaming'
    },
    { 
      title: 'Budget Friendly', 
      image: '/col3.jpg',
      link: '/produits?filter=budget'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <section className="relative h-[600px] bg-gray-900 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <p className="text-sm uppercase tracking-wider mb-2 text-yellow-400">{slide.subtitle}</p>
                <h1 className="text-6xl md:text-7xl font-bold mb-6">{slide.title}</h1>
                <Link href="/produits">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-10 rounded-full transition transform hover:scale-105">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-yellow-500 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <p className="text-gray-600 mt-1">Nouveaux smartphones premium et professionnels</p>
            </div>
            <div className="flex gap-4">
              <Link href="/produits" className="text-sm font-semibold hover:text-yellow-600">New Arrivals</Link>
              <Link href="/produits?filter=best" className="text-sm text-gray-600 hover:text-yellow-600">Best Sellers</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nouveautes.map((produit) => (
              <Link key={produit.id} href={`/produits/${produit.id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition group">
                  {produit.badge && (
                    <div className="absolute z-10 mt-4 ml-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        produit.badge === 'Best Seller' ? 'bg-yellow-500 text-black' :
                        produit.badge === 'Nouveau' ? 'bg-blue-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {produit.badge}
                      </span>
                    </div>
                  )}
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={produit.image}
                      alt={produit.nom}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{produit.marque}</p>
                    <h3 className="font-bold text-lg mb-2">{produit.nom}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        {produit.ancienPrix && (
                          <p className="text-sm text-red-500 line-through font-semibold">{produit.ancienPrix.toLocaleString()} CFA</p>
                        )}
                        <p className="text-xl font-bold text-black">{produit.prix.toLocaleString()} CFA</p>
                      </div>
                      <div className="flex gap-1">
                        {produit.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Barre de message défilant */}
      <section className="bg-gray-200 py-4 overflow-hidden">
        <div className="relative">
          <div className="animate-scroll whitespace-nowrap">
            <span className="inline-block text-black font-bold text-lg px-8">
              🎉 Bienvenue chez best life - Votre partenaire de confiance pour les smartphones premium, l'électronique moderne et l'immobilier de qualité ! |  Profitez de nos offres exceptionnelles sur toute notre gamme de produits | 🚚 Livraison gratuite partout au Cameroun | 🔒 Paiement 100% sécurisé | 💳 Facilités de paiement disponibles |  best life - Change Life, Change Future 
            </span>
            <span className="inline-block text-black font-bold text-lg px-8">
              🎉 Bienvenue chez best life - Votre partenaire de confiance pour les smartphones premium, l'électronique moderne et l'immobilier de qualité ! | Profitez de nos offres exceptionnelles sur toute notre gamme de produits | 🚚 Livraison gratuite partout au Cameroun | 🔒 Paiement 100% sécurisé | 💳 Facilités de paiement disponibles |  best life - Change Life, Change Future 
            </span>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <Link key={index} href={collection.link}>
                <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                    <span className="text-yellow-400 font-semibold">Explorer →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Livraison Gratuite</h3>
              <p className="text-gray-400">Sur toutes les commandes</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Paiement Sécurisé</h3>
              <p className="text-gray-400">Transactions 100% sécurisées</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">↩️</div>
              <h3 className="text-xl font-bold mb-2 text-yellow-400">Retour Gratuit</h3>
              <p className="text-gray-400">Sous 30 jours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
