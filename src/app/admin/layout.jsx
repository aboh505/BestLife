'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { utilisateur, deconnexion } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Redirect if not admin
    if (utilisateur && utilisateur.role !== 'admin') {
      router.push('/');
    }
    if (!utilisateur) {
      router.push('/login?redirect=' + pathname);
    }
  }, [utilisateur, router, pathname]);

  if (!utilisateur || utilisateur.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/produits', label: 'Produits', icon: Package },
    { href: '/admin/orders', label: 'Commandes', icon: ShoppingCart },
    { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-56 bg-gray-900 text-white shadow-lg flex flex-col
        fixed lg:relative inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="flex justify-center hover:opacity-80 transition">
            <Image 
              src="/logo1.png" 
              alt="BestLife Logo" 
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1.5 transition text-sm ${
                  isActive
                    ? 'bg-yellow-500 text-black font-semibold'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Actions */}
        <div className="p-3 border-t border-gray-700 space-y-2">
          <div className="flex items-center space-x-2 px-2 py-1.5">
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-xs">
                {utilisateur.prenom[0]}{utilisateur.nom[0]}
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">
                {utilisateur.prenom} {utilisateur.nom}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{utilisateur.email}</p>
            </div>
          </div>
          
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition text-sm"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">Retour au site</span>
          </Link>

          <button
            onClick={() => {
              deconnexion();
              router.push('/');
            }}
            className="flex items-center space-x-2 w-full px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:w-auto p-4 sm:p-6 lg:p-8 overflow-y-auto pt-16 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
