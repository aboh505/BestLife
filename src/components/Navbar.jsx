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
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-yellow-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-32 h-12 flex items-center justify-center">
              <Image
                src="/logo1.png"
                alt="BestLife Logo"
                width={90}
                height={35}
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname === '/' ? 'text-amber-600 font-bold' : ''}`}
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname === '/about' ? 'text-amber-600 font-bold' : ''}`}
            >
              À propos
            </Link>
            <Link
              href="/produits"
              className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname === '/produits' ? 'text-amber-600 font-bold' : ''}`}
            >
              Produits
            </Link>
            
            <Link
              href="/faq"
              className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname === '/faq' ? 'text-amber-600 font-bold' : ''}`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname === '/contact' ? 'text-amber-600 font-bold' : ''}`}
            >
              Contact
            </Link>
            {utilisateur?.role === 'admin' && (
              <Link
                href="/admin/produits"
                className={`text-gray-800 hover:text-yellow-600 transition font-medium ${pathname.startsWith('/admin') ? 'text-amber-600 font-bold' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/panier" className="relative">
              <button className="p-2 hover:bg-amber-50 rounded-full transition">
                <span className="text-xl">🛒</span>
                {nombreArticles > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {nombreArticles}
                  </span>
                )}
              </button>
            </Link>

            {utilisateur ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/profil" className="text-gray-800 hover:text-amber-600">
                  <span className="font-medium">{utilisateur.prenom}</span>
                </Link>
                <button
                  onClick={deconnexion}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition font-medium">
                
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/register">
                  <button className="bg-yellow-600  hover:bg-yellow-600  text-white px-4 py-2 rounded-lg transition font-medium">
                    Inscription
                  </button>
                </Link>
              </div>
            )}

            {/* Bouton hamburger pour mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-800 p-2 hover:bg-amber-50 rounded-lg transition"
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
          <div className="md:hidden bg-white border-t-2 border-amber-500">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                onClick={fermerMenu}
                className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname === '/' ? 'text-amber-600 font-bold' : ''}`}
              >
                Accueil
              </Link>
              <Link
                href="/produits"
                onClick={fermerMenu}
                className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname === '/produits' ? 'text-amber-600 font-bold' : ''}`}
              >
                Produits
              </Link>
              <Link
                href="/about"
                onClick={fermerMenu}
                className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname === '/about' ? 'text-amber-600 font-bold' : ''}`}
              >
                À propos
              </Link>
              <Link
                href="/faq"
                onClick={fermerMenu}
                className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname === '/faq' ? 'text-amber-600 font-bold' : ''}`}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                onClick={fermerMenu}
                className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname === '/contact' ? 'text-amber-600 font-bold' : ''}`}
              >
                Contact
              </Link>
              {utilisateur?.role === 'admin' && (
                <Link
                  href="/admin/produits"
                  onClick={fermerMenu}
                  className={`block text-gray-800 hover:text-yellow-600 transition py-2 font-medium ${pathname.startsWith('/admin') ? 'text-amber-600 font-bold' : ''}`}
                >
                  Admin
                </Link>
              )}

              <div className="pt-4 border-t border-amber-200">
                {utilisateur ? (
                  <>
                    <Link
                      href="/profil"
                      onClick={fermerMenu}
                      className="block text-gray-800 transition py-2 font-medium"
                    >
                      Mon profil ({utilisateur.prenom})
                    </Link>
                    <button
                      onClick={() => {
                        deconnexion();
                        fermerMenu();
                      }}
                      className="w-full text-left bg-red-500 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition mt-2 font-medium"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link href="/register" onClick={fermerMenu}>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition font-medium">
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
