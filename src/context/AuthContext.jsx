'use client';

import { createContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    // Clear old localStorage keys from previous system
    localStorage.removeItem('utilisateurs'); // Old users array
    localStorage.removeItem('utilisateurConnecte'); // Old logged in user
    
    // Check if user is logged in with new token system
    const token = localStorage.getItem('token');
    const utilisateurStocke = localStorage.getItem('utilisateur');
    
    if (token && utilisateurStocke) {
      setUtilisateur(JSON.parse(utilisateurStocke));
    }
    setChargement(false);
  }, []);

  const connexion = (utilisateur, token) => {
    setUtilisateur(utilisateur);
    localStorage.setItem('token', token);
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  };

  const deconnexion = () => {
    setUtilisateur(null);
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    // Also clear any old keys
    localStorage.removeItem('utilisateurs');
    localStorage.removeItem('utilisateurConnecte');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ utilisateur, connexion, deconnexion, chargement, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}
