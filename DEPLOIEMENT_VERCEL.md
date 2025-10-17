# Guide de Déploiement sur Vercel

## 📋 Prérequis

- Un compte Vercel (gratuit)
- Le projet BestLife sur GitHub/GitLab/Bitbucket
- Node.js 18+ installé localement

## 🚀 Étapes de Déploiement

### 1. Préparation du Projet

Le projet est maintenant configuré avec :
- ✅ `vercel.json` - Configuration optimale pour Vercel
- ✅ `next.config.mjs` - Configuration Next.js optimisée
- ✅ `.vercelignore` - Fichiers à exclure du déploiement

### 2. Déploiement via Vercel Dashboard

1. **Connectez-vous à Vercel** : https://vercel.com
2. **Cliquez sur "Add New Project"**
3. **Importez votre repository Git**
4. **Vercel détectera automatiquement Next.js**
5. **Configurez les paramètres** :
   - Framework Preset: `Next.js`
   - Build Command: `next build` (déjà configuré)
   - Output Directory: `.next` (automatique)
   - Install Command: `npm install` (automatique)

6. **Cliquez sur "Deploy"**

### 3. Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer le projet
vercel

# Pour un déploiement en production
vercel --prod
```

## ⚙️ Configuration des Variables d'Environnement

Si vous avez des variables d'environnement :

1. Allez dans **Project Settings** sur Vercel
2. Cliquez sur **Environment Variables**
3. Ajoutez vos variables :
   - `NEXT_PUBLIC_API_URL` (si applicable)
   - Autres variables nécessaires

## 🔧 Résolution des Problèmes Courants

### Erreur : "Image Optimization using Next.js' default loader"

**Solution** : Déjà configuré dans `next.config.mjs` avec `remotePatterns`

### Erreur : "Build failed due to ESLint errors"

**Solutions** :
1. Corriger les erreurs ESLint localement : `npm run lint`
2. Si urgent, modifier `next.config.mjs` :
   ```javascript
   eslint: {
     ignoreDuringBuilds: true, // Temporaire uniquement !
   }
   ```

### Erreur : "Module not found"

**Solution** : Vérifier que toutes les dépendances sont dans `package.json`
```bash
npm install
```

### Erreur : "Function execution timeout"

**Solution** : 
- Vercel Free : timeout de 10s
- Optimiser les requêtes API
- Utiliser ISR (Incremental Static Regeneration)

### Images ne s'affichent pas

**Solution** : 
- Vérifier que les images sont dans `/public`
- Utiliser des chemins relatifs : `/image.jpg`
- Configuration déjà optimisée dans `next.config.mjs`

## 📊 Optimisations Appliquées

### 1. Configuration des Images
- Support AVIF et WebP
- Cache TTL de 60 secondes
- Remote patterns configurés

### 2. Sécurité
- En-têtes de sécurité (X-Frame-Options, etc.)
- DNS Prefetch activé

### 3. Performance
- Compression activée
- SWC Minify activé
- React Strict Mode

## 🔄 Redéploiement Automatique

Vercel redéploie automatiquement à chaque push sur la branche `main`.

Pour désactiver :
```json
// vercel.json
{
  "git": {
    "deploymentEnabled": {
      "main": false
    }
  }
}
```

## 📝 Commandes Utiles

```bash
# Tester le build localement
npm run build
npm run start

# Vérifier les erreurs ESLint
npm run lint

# Voir les logs de déploiement
vercel logs [deployment-url]

# Lister les déploiements
vercel ls
```

## 🎯 Checklist Avant Déploiement

- [ ] `npm run build` fonctionne localement
- [ ] `npm run lint` ne retourne pas d'erreurs critiques
- [ ] Toutes les images sont dans `/public`
- [ ] Les variables d'environnement sont configurées
- [ ] Le `.gitignore` exclut `node_modules` et `.next`
- [ ] Les dépendances sont à jour dans `package.json`

## 🆘 Support

En cas de problème :
1. Vérifier les logs de build sur Vercel
2. Consulter la documentation : https://vercel.com/docs
3. Tester localement avec `npm run build`

## 🎉 Après le Déploiement

Votre site sera accessible sur :
- URL de production : `https://votre-projet.vercel.app`
- URLs de preview pour chaque branche

Vous pouvez configurer un domaine personnalisé dans les paramètres du projet.
