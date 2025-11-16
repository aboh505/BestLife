'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Zap, Shield } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Nouvelle Collection 2025',
      subtitle: 'SMARTPHONES PREMIUM',
      description: 'Découvrez les derniers iPhone, Samsung Galaxy et plus encore',
      image: '/hero1.jpg',
      badge: 'Nouveau',
      gradient: 'from-white-600/80 to-white-800/80'
    },
    {
      title: 'Offres Exceptionnelles',
      subtitle: 'JUSQU\'À -10% DE RÉDUCTION',
      description: 'Profitez de nos promotions sur une sélection de produits',
      image: '/hero2.jpg',
      badge: 'Promo',
      gradient: 'from-white-600/80 to-white-800/80'
    },
    {
      title: 'Technologie de Pointe',
      subtitle: 'ÉLECTRONIQUE & LIFESTYLE',
      description: 'Équipez votre maison avec les meilleurs appareils',
      image: '/col1.jpg',
      badge: 'Tendance',
      gradient: 'from-white-600/80 to-white-800/80'
    },
    {
      title: 'Bien-être & Confort',
      subtitle: 'MEUBLES & DÉCORATION',
      description: 'Transformez votre espace de vie',
      image: '/',
      badge: 'Lifestyle',
      gradient: 'from-white-600/80 to-white-800/80'
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
      image: '/col1.jpg',
      link: '/produits?filter=budget'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel - Enhanced */}
      <section className="relative h-[700px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} z-10`} />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-3xl">
                <div className="inline-block mb-4">
                  <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                    {slide.badge}
                  </span>
                </div>
                <p className="text-lg uppercase tracking-widest mb-3 text-amber-300 font-semibold" style={{ fontFamily: 'var(--bodyFontStack)' }}>{slide.subtitle}</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--bodyFontStack)' }}>
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light" style={{ fontFamily: 'var(--bodyFontStack)' }}>{slide.description}</p>
                <Link href="/produits">


                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition group"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition group"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-yellow-500 w-12' : 'bg-white/50 w-8 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </section>



      {/* New Arrivals */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                <h2 className="text-4xl font-black" style={{ fontFamily: 'var(--bodyFontStack)' }}>Nouveautés</h2>
              </div>
              <p className="text-gray-600 text-lg" style={{ fontFamily: 'var(--bodyFontStack)' }}>Les derniers produits qui vont changer votre quotidien</p>
            </div>
            <Link href="/produits" className="hidden md:block bg-yellow-600 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition shadow-lg" style={{ fontFamily: 'var(--bodyFontStack)' }}>
              Voir Tout →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nouveautes.map((produit) => (
              <div key={produit.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                <div className="relative">
                  {produit.badge && (
                    <div className="absolute z-10 top-4 left-4">
                      <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-lg ${produit.badge === 'Best Seller' ? 'bg-amber-500 text-white' :
                          produit.badge === 'Nouveau' ? 'bg-blue-500 text-white' :
                            'bg-red-500 text-white'
                        }`}>
                        {produit.badge}
                      </span>
                    </div>
                  )}
                  <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={produit.image}
                      alt={produit.nom}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition duration-500"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--bodyFontStack)' }}>{produit.marque}</p>
                  <h3 className="font-bold text-xl mb-3" style={{ fontFamily: 'var(--bodyFontStack)' }}>{produit.nom}</h3>

                  <div>
                    {produit.ancienPrix && (
                      <p className="text-sm text-gray-400 line-through font-semibold" style={{ fontFamily: 'var(--bodyFontStack)' }}>{produit.ancienPrix.toLocaleString()} FCFA</p>
                    )}
                    <p className="text-2xl font-black text-black" style={{ fontFamily: 'var(--bodyFontStack)' }}>{produit.prix.toLocaleString()} <span className="text-sm font-normal">FCFA</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-black to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--bodyFontStack)' }}>Pourquoi Choisir Best Life ?</h2>
            <p className="text-gray-400 text-lg" style={{ fontFamily: 'var(--bodyFontStack)' }}>Votre satisfaction est notre priorité</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600" style={{ fontFamily: 'var(--bodyFontStack)' }}>Livraison Express</h3>
              <p className="text-gray-400" style={{ fontFamily: 'var(--bodyFontStack)' }}>Livraison rapide partout au Cameroun</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600" style={{ fontFamily: 'var(--bodyFontStack)' }}>100% Sécurisé</h3>
              <p className="text-gray-400" style={{ fontFamily: 'var(--bodyFontStack)' }}>Paiement et données protégés</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600" style={{ fontFamily: 'var(--bodyFontStack)' }}>Produits Authentiques</h3>
              <p className="text-gray-400" style={{ fontFamily: 'var(--bodyFontStack)' }}>Garantie d'authenticité à 100%</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition">
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600" style={{ fontFamily: 'var(--bodyFontStack)' }}>Support 24/7</h3>
              <p className="text-gray-400" style={{ fontFamily: 'var(--bodyFontStack)' }}>Service client toujours disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3" style={{ fontFamily: 'var(--bodyFontStack)' }}>Collections Spéciales</h2>
            <p className="text-gray-600 text-lg" style={{ fontFamily: 'var(--bodyFontStack)' }}>Des sélections soigneusement choisies pour vous</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link key={index} href={collection.link}>
                <div className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl font-black mb-3" style={{ fontFamily: 'var(--bodyFontStack)' }}>{collection.title}</h3>
                    <span className="inline-block bg-amber-500 text-white px-6 py-2 rounded-full font-bold group-hover:bg-amber-600 transition shadow-lg" style={{ fontFamily: 'var(--bodyFontStack)' }}>
                      Explorer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     

     

    </div>
  );

  
}
