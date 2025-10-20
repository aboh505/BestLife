'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '15%', label: 'Clients satisfaits' },
    { value: '3+', label: 'Années d\'expérience' },
    { value: '20+', label: 'Téléphones vendus' }
  ];

  const expertise = [
    { icon: '-', title: 'Résultats mesurables', description: 'Suivi de performance en temps réel' },
    { icon: '-', title: 'Solutions innovantes', description: 'Technologies de pointe' },
    { icon: '-', title: 'Expertise multi-industrie', description: 'Expérience diversifiée' },
    { icon: '-', title: 'Croissance durable', description: 'Stratégies à long terme' },
   
  ];

  const milestones = [
    { year: '2022', title: 'Lancement de BestLife', description: 'Début de notre aventure dans la vente de smartphones premium', color: 'bg-gray-900' },
    { year: '2023', title: 'Expansion Nationale', description: 'Ouverture de 5 boutiques physiques en France', color: 'bg-yellow-500' },
    { year: '2024', title: 'Partenariats Premium', description: 'Partenariats officiels avec Apple, Samsung et Google', color: 'bg-gray-900' },
    { year: '2025', title: 'Leader du Marché', description: 'N°1 de la vente de smartphones premium en ligne', color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">À propos de best life</h1>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Chez best life, nous nous spécialisons dans la fourniture de smartphones premium de haute qualité. 
                Avec plus de 3 ans d'expérience dans l'industrie, nous nous engageons à offrir une excellence 
                opérationnelle et à stimuler la croissance et l'innovation pour nos clients.
              </p>
              <div className="flex gap-4">
                <Link href="/produits">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition">
                    Nos Produits
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl font-bold text-black">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-300 rounded-2xl overflow-hidden h-[500px] relative">
                <Image src="/t3.jpg" alt="About best life" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] relative">
                <Image src="/t2.jpg" alt="Notre équipe" fill className="object-cover" />
              </div>
            </div>
            <div>
              <div className="inline-block bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                À PROPOS DE NOUS
              </div>
              <h2 className="text-4xl font-bold mb-6">Libérez notre expertise pour stimuler le succès</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre équipe d'experts passionnés se consacre à fournir des solutions innovantes et des services 
                exceptionnels. Nous combinons une expertise approfondie du secteur avec une approche centrée sur 
                le client pour relever des défis uniques.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-gray-600">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border">JALONS</div>
            <h2 className="text-4xl font-bold mb-4">Notre parcours : jalons clés et réalisations</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
                <div className={`w-16 h-16 ${milestone.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <span className="text-white text-2xl font-bold">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                <p className="text-gray-600 text-sm">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      
    </div>
  );
}
