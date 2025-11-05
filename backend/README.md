# BestLife Backend API

Backend REST API pour l'application e-commerce BestLife, développé avec Node.js, Express et MongoDB.

## 🚀 Fonctionnalités

- ✅ Authentification JWT (Register/Login)
- ✅ Gestion complète des produits (CRUD)
- ✅ Gestion des commandes
- ✅ Gestion des utilisateurs (Admin)
- ✅ Tableau de bord administrateur avec statistiques
- ✅ Protection des routes avec middleware d'authentification
- ✅ Gestion des rôles (Client/Admin)
- ✅ Système d'envoi d'emails (Contact & Newsletter)
- ✅ Templates HTML pour emails professionnels

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🛠️ Installation

1. Installer les dépendances:
```bash
npm install
```

2. Créer un fichier `.env` à la racine du dossier backend:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/bestlife
# Pour MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/bestlife

# JWT Configuration
JWT_SECRET=bestlife_super_secret_key_change_in_production_2024
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=BestLife
ADMIN_EMAIL=admin@bestlife.com
```

> 📧 **Email Setup:** See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed email configuration instructions.

3. Démarrer MongoDB (si local):
```bash
mongod
```

4. Démarrer le serveur:

**Mode développement (avec nodemon):**
```bash
npm run dev
```

**Mode production:**
```bash
npm start
```

## 📁 Structure du Projet

```
backend/
├── config/
│   └── db.js                 # Configuration MongoDB
├── controllers/
│   ├── authController.js     # Login/Register
│   ├── productController.js  # CRUD Produits
│   ├── orderController.js    # Gestion Commandes
│   ├── userController.js     # Gestion Utilisateurs
│   └── adminController.js    # Dashboard Admin
├── middleware/
│   ├── auth.js              # JWT Authentication
│   └── admin.js             # Admin Authorization
├── models/
│   ├── User.js              # Modèle Utilisateur
│   ├── Product.js           # Modèle Produit
│   └── Order.js             # Modèle Commande
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
├── uploads/                  # Dossier pour les images
├── .env                      # Variables d'environnement
├── .gitignore
├── package.json
└── server.js                 # Point d'entrée
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur (Protected)

### Products (`/api/products`)
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail d'un produit
- `POST /api/products` - Créer un produit (Admin)
- `PUT /api/products/:id` - Modifier un produit (Admin)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)
- `GET /api/products/brands` - Liste des marques

### Orders (`/api/orders`)
- `POST /api/orders` - Créer une commande (Protected)
- `GET /api/orders/myorders` - Mes commandes (Protected)
- `GET /api/orders/:id` - Détail d'une commande (Protected)
- `GET /api/orders` - Toutes les commandes (Admin)
- `PUT /api/orders/:id/status` - Modifier le statut (Admin)

### Users (`/api/users`)
- `GET /api/users` - Liste des utilisateurs (Admin)
- `GET /api/users/:id` - Détail d'un utilisateur (Admin)
- `PUT /api/users/:id` - Modifier un utilisateur (Admin)
- `DELETE /api/users/:id` - Supprimer un utilisateur (Admin)
- `PUT /api/users/:id/toggle-status` - Activer/Désactiver (Admin)

### Admin Dashboard (`/api/admin`)
- `GET /api/admin/dashboard` - Statistiques du tableau de bord (Admin)
- `GET /api/admin/sales-stats` - Statistiques de ventes (Admin)

### Contact (`/api/contact`)
- `POST /api/contact` - Envoyer un message de contact (Public)
- `POST /api/contact/newsletter` - S'abonner à la newsletter (Public)

## 🔐 Authentification

Pour les routes protégées, inclure le token JWT dans le header:
```
Authorization: Bearer <votre_token_jwt>
```

## 📊 Modèles de Données

### User
```javascript
{
  nom: String,
  prenom: String,
  email: String (unique),
  motDePasse: String (hashed),
  role: 'client' | 'admin',
  dateInscription: Date,
  actif: Boolean
}
```

### Product
```javascript
{
  nom: String,
  marque: String,
  categorie: 'smartphone' | 'electronique' | 'immobilier',
  prix: Number,
  ancienPrix: Number,
  description: String,
  descriptionLongue: String,
  stock: Number,
  image: String,
  caracteristiques: [String],
  actif: Boolean
}
```

### Order
```javascript
{
  utilisateur: ObjectId (ref: User),
  articles: [{
    produit: ObjectId (ref: Product),
    nom: String,
    prix: Number,
    quantite: Number
  }],
  total: Number,
  statut: 'En préparation' | 'Expédiée' | 'Livrée' | 'Annulée',
  adresseLivraison: Object
}
```

## 🧪 Test de l'API

Exemple de création d'un compte admin:
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "nom": "Admin",
  "prenom": "BestLife",
  "email": "admin@bestlife.com",
  "motDePasse": "admin123"
}
```

Ensuite, modifier le rôle directement dans MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@bestlife.com" },
  { $set: { role: "admin" } }
)
```

## 🚀 Déploiement

Pour le déploiement en production:
1. Utiliser MongoDB Atlas pour la base de données
2. Configurer les variables d'environnement sur votre plateforme (Heroku, Railway, etc.)
3. Changer `NODE_ENV` en `production`
4. Utiliser un `JWT_SECRET` fort et unique

## 📝 Notes

- Les mots de passe sont hashés avec bcryptjs
- Les tokens JWT expirent après 7 jours (configurable)
- CORS est configuré pour accepter les requêtes du frontend
- Les images de produits peuvent être uploadées dans le dossier `uploads/`

## 🤝 Support

Pour toute question ou problème, contactez l'équipe de développement BestLife.
