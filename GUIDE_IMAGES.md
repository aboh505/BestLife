# Guide pour remplacer les images dans BestLife

## Structure des dossiers d'images

Votre site utilise des images placées dans le dossier `public/images/`. Voici la structure complète :

```
public/
└── images/
    ├── hero-1.jpg          # Image principale du slider (1920x600px recommandé)
    ├── hero-2.jpg          # Deuxième image du slider (1920x600px recommandé)
    ├── products/           # Images des produits
    │   ├── iphone15pro.jpg
    │   ├── galaxys24.jpg
    │   ├── pixel8.jpg
    │   ├── oneplus12.jpg
    │   └── xiaomi14.jpg
    └── collections/        # Images des collections
        ├── premium.jpg     # Collection Premium (800x600px recommandé)
        ├── gaming.jpg      # Collection Gaming (800x600px recommandé)
        └── budget.jpg      # Collection Budget (800x600px recommandé)
```

## Comment remplacer les images

### 1. Images Hero (Slider principal)
- **Emplacement** : `public/images/hero-1.jpg` et `public/images/hero-2.jpg`
- **Dimensions recommandées** : 1920x600 pixels
- **Format** : JPG ou PNG
- **Utilisation** : Ces images apparaissent dans le grand slider en haut de la page d'accueil

### 2. Images des produits
- **Emplacement** : `public/images/products/`
- **Dimensions recommandées** : 800x800 pixels (format carré)
- **Format** : JPG ou PNG avec fond transparent de préférence
- **Noms de fichiers** :
  - `iphone15pro.jpg` - iPhone 15 Pro
  - `galaxys24.jpg` - Samsung Galaxy S24 Ultra
  - `pixel8.jpg` - Google Pixel 8 Pro
  - `oneplus12.jpg` - OnePlus 12
  - `xiaomi14.jpg` - Xiaomi 14 Pro

### 3. Images des collections
- **Emplacement** : `public/images/collections/`
- **Dimensions recommandées** : 800x600 pixels
- **Format** : JPG ou PNG
- **Noms de fichiers** :
  - `premium.jpg` - Collection Premium
  - `gaming.jpg` - Collection Gaming Phones
  - `budget.jpg` - Collection Budget Friendly

## Instructions étape par étape

1. **Préparez vos images** :
   - Redimensionnez-les aux dimensions recommandées
   - Optimisez-les pour le web (compression)
   - Renommez-les selon les noms indiqués ci-dessus

2. **Placez vos images** :
   ```bash
   # Depuis la racine du projet
   cp votre-image-hero-1.jpg public/images/hero-1.jpg
   cp votre-image-hero-2.jpg public/images/hero-2.jpg
   cp votre-iphone.jpg public/images/products/iphone15pro.jpg
   # etc...
   ```

3. **Vérifiez** :
   - Lancez le serveur de développement : `npm run dev`
   - Ouvrez http://localhost:3000
   - Vérifiez que toutes les images s'affichent correctement

## Conseils pour de meilleures images

- **Qualité** : Utilisez des images haute résolution mais optimisées
- **Cohérence** : Gardez un style visuel cohérent entre toutes les images
- **Fond** : Pour les produits, privilégiez des fonds blancs ou transparents
- **Format** : JPG pour les photos, PNG pour les images avec transparence
- **Taille** : Ne dépassez pas 500KB par image pour de meilleures performances

## Où trouver des images

Si vous n'avez pas encore vos propres images, vous pouvez utiliser :
- **Unsplash** (https://unsplash.com) - Images gratuites haute qualité
- **Pexels** (https://pexels.com) - Photos et vidéos gratuites
- **Images officielles** - Sites web des fabricants (Apple, Samsung, etc.)

## Thème de couleurs du site

Le site utilise le thème **Jaune Or / Noir / Blanc** :
- **Jaune principal** : #FFD700 (Or)
- **Jaune secondaire** : #FFA500 (Orange doré)
- **Noir** : #000000
- **Blanc** : #FFFFFF

Essayez de choisir des images qui s'harmonisent avec ces couleurs.
