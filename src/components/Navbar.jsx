'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { PanierContext } from '@/context/PanierContext';

export default function Navbar() {
  const pathname = usePathname();
  const { utilisateur, deconnexion } = useContext(AuthContext);
  const { panier } = useContext(PanierContext);
  const [menuOuvert, setMenuOuvert] = useState(false);

  const nombreArticles = panier.reduce((total, item) => total + item.quantite, 0);

  const toggleMenu = () => setMenuOuvert(!menuOuvert);
  const fermerMenu = () => setMenuOuvert(false);

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-20 h-15 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="BestLife Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-Raleway, sans-serif text-amber-500 leading-none flex items-center">
              BestLife
            </span>

          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-white hover:text-yellow-400 transition ${pathname === '/' ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Accueil
            </Link>
            <Link
              href="/produits"
              className={`text-white hover:text-yellow-400 transition ${pathname === '/produits' ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Produits
            </Link>
            <Link
              href="/about"
              className={`text-white hover:text-yellow-400 transition ${pathname === '/about' ? 'text-yellow-400 font-semibold' : ''}`}
            >
              À propos
            </Link>
            <Link
              href="/faq"
              className={`text-white hover:text-yellow-400 transition ${pathname === '/faq' ? 'text-yellow-400 font-semibold' : ''}`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`text-white hover:text-yellow-400 transition ${pathname === '/contact' ? 'text-yellow-400 font-semibold' : ''}`}
            >
              Contact
            </Link>
            {utilisateur?.role === 'admin' && (
              <Link
                href="/admin/produits"
                className={`text-white hover:text-yellow-400 transition ${pathname.startsWith('/admin') ? 'text-yellow-400 font-semibold' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/panier" className="relative">
              <button className="p-2 hover:bg-gray-800 rounded-full transition">
                <span className="text-xl">🛒</span>
                {nombreArticles > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {nombreArticles}
                  </span>
                )}
              </button>
            </Link>

            {utilisateur ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/profil" className="text-white hover:text-yellow-400">
                  <span className="font-medium">{utilisateur.prenom}</span>
                </Link>
                <button
                  onClick={deconnexion}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/register">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition">
                    Inscription
                  </button>
                </Link>
              </div>
            )}

            {/* Bouton hamburger pour mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOuvert ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuOuvert && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                onClick={fermerMenu}
                className={`block text-white hover:text-yellow-400 transition py-2 ${pathname === '/' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                Accueil
              </Link>
              <Link
                href="/produits"
                onClick={fermerMenu}
                className={`block text-white hover:text-yellow-400 transition py-2 ${pathname === '/produits' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                Produits
              </Link>
              <Link
                href="/about"
                onClick={fermerMenu}
                className={`block text-white hover:text-yellow-400 transition py-2 ${pathname === '/about' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                À propos
              </Link>
              <Link
                href="/faq"
                onClick={fermerMenu}
                className={`block text-white hover:text-yellow-400 transition py-2 ${pathname === '/faq' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                onClick={fermerMenu}
                className={`block text-white hover:text-yellow-400 transition py-2 ${pathname === '/contact' ? 'text-yellow-400 font-semibold' : ''}`}
              >
                Contact
              </Link>
              {utilisateur?.role === 'admin' && (
                <Link
                  href="/admin/produits"
                  onClick={fermerMenu}
                  className={`block text-white hover:text-yellow-400 transition py-2 ${pathname.startsWith('/admin') ? 'text-yellow-400 font-semibold' : ''}`}
                >
                  Admin
                </Link>
              )}

              <div className="pt-4 border-t border-gray-800">
                {utilisateur ? (
                  <>
                    <Link
                      href="/profil"
                      onClick={fermerMenu}
                      className="block text-white hover:text-yellow-400 transition py-2"
                    >
                      Mon profil ({utilisateur.prenom})
                    </Link>
                    <button
                      onClick={() => {
                        deconnexion();
                        fermerMenu();
                      }}
                      className="w-full text-left bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition mt-2"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link href="/register" onClick={fermerMenu}>
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition">
                      Inscription
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
