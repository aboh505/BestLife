'use client';

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const utilisateurStocke = localStorage.getItem('utilisateurConnecte');
    if (utilisateurStocke) {
      setUtilisateur(JSON.parse(utilisateurStocke));
    }
    setChargement(false);
  }, []);

  const connexion = (utilisateur) => {
    setUtilisateur(utilisateur);
    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
  };

  const deconnexion = () => {
    setUtilisateur(null);
    localStorage.removeItem('utilisateurConnecte');
  };

  return (
    <AuthContext.Provider value={{ utilisateur, connexion, deconnexion, chargement }}>
      {children}
    </AuthContext.Provider>
  );
}
