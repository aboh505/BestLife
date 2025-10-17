'use client';

import { createContext, useState, useEffect } from 'react';

export const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierStocke = localStorage.getItem('panier');
    if (panierStocke) {
      setPanier(JSON.parse(panierStocke));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const ajouterAuPanier = (produit, quantite = 1) => {
    setPanier(prevPanier => {
      const index = prevPanier.findIndex(item => item.id === produit.id);
      if (index > -1) {
        const nouveauPanier = [...prevPanier];
        nouveauPanier[index].quantite += quantite;
        return nouveauPanier;
      }
      return [...prevPanier, { ...produit, quantite }];
    });
  };

  const retirerDuPanier = (produitId) => {
    setPanier(prevPanier => prevPanier.filter(item => item.id !== produitId));
  };

  const modifierQuantite = (produitId, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) {
      retirerDuPanier(produitId);
      return;
    }
    setPanier(prevPanier =>
      prevPanier.map(item =>
        item.id === produitId ? { ...item, quantite: nouvelleQuantite } : item
      )
    );
  };

  const viderPanier = () => {
    setPanier([]);
  };

  const getTotal = () => {
    return panier.reduce((total, item) => total + item.prix * item.quantite, 0);
  };

  return (
    <PanierContext.Provider value={{
      panier,
      ajouterAuPanier,
      retirerDuPanier,
      modifierQuantite,
      viderPanier,
      getTotal
    }}>
      {children}
    </PanierContext.Provider>
  );
}
