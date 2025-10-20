'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { connexion } = useContext(AuthContext);
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', motDePasse: '', confirmMotDePasse: '' });
  const [erreur, setErreur] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErreur('');
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      setErreur('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.motDePasse.length < 6) {
      setErreur('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs') || '[]');
    if (utilisateurs.find(u => u.email === formData.email)) {
      setErreur('Cet email est déjà utilisé');
      return;
    }
    const nouvelUtilisateur = {
      id: Date.now(),
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      motDePasse: formData.motDePasse,
      role: 'client',
      dateInscription: new Date().toISOString()
    };
    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    connexion(nouvelUtilisateur);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border-t-4 border-yellow-500">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-13">
            <div className="relative w-40 h-16">
              <Image 
                src="/logo1.png" 
                alt="BestLife Logo" 
                width={140}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Créez votre compte best life</h1>
        </div>
        
        {erreur && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">{erreur}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Prénom</label>
              <input type="text" required value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">Nom</label>
              <input type="text" required value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Mot de passe</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={formData.motDePasse} 
                onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">Confirmer le mot de passe</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                required 
                value={formData.confirmMotDePasse} 
                onChange={(e) => setFormData({...formData, confirmMotDePasse: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" 
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg transition transform hover:scale-105">
            S'inscrire
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Déjà un compte ? <Link href="/login" className="text-yellow-600 hover:text-yellow-700 font-bold">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
}
