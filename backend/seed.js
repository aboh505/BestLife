const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

// Load env vars
dotenv.config();

// Sample products data
const products = [
  {
    nom: 'iPhone 15 Pro',
    marque: 'Apple',
    categorie: 'smartphone',
    prix: 786350,
    ancienPrix: 920000,
    description: 'Le dernier iPhone avec puce A17 Pro',
    descriptionLongue: 'L\'iPhone 15 Pro redéfinit ce qu\'un smartphone peut faire avec sa puce A17 Pro révolutionnaire.',
    stock: 15,
    image: '/i1.jpg',
    caracteristiques: ['Écran Super Retina XDR 6.1"', 'Puce A17 Pro', 'Triple caméra 48MP', '128GB', '5G', 'Face ID'],
    actif: true
  },
  {
    nom: 'Samsung Galaxy S24 Ultra',
    marque: 'Samsung',
    categorie: 'smartphone',
    prix: 852000,
    ancienPrix: 1050000,
    description: 'Smartphone premium avec S Pen',
    descriptionLongue: 'Le Galaxy S24 Ultra est le summum de l\'innovation Samsung avec son S Pen intégré.',
    stock: 20,
    image: '/s1.jpg',
    caracteristiques: ['Écran Dynamic AMOLED 6.8"', 'Snapdragon 8 Gen 3', 'Quad caméra 200MP', '256GB', 'S Pen', '5G'],
    actif: true
  },
  {
    nom: 'Google Pixel 8 Pro',
    marque: 'Google',
    categorie: 'smartphone',
    prix: 655350,
    ancienPrix: 780000,
    description: 'Meilleure photographie IA',
    descriptionLongue: 'Le Pixel 8 Pro offre la meilleure expérience Android pure avec des fonctionnalités IA révolutionnaires.',
    stock: 12,
    image: '/p1.jpg',
    caracteristiques: ['Écran LTPO OLED 6.7"', 'Google Tensor G3', 'Triple caméra 50MP', '128GB', 'Magic Eraser', '5G'],
    actif: true
  },
  {
    nom: 'OnePlus 12',
    marque: 'OnePlus',
    categorie: 'smartphone',
    prix: 524350,
    ancienPrix: 650000,
    description: 'Performance et charge rapide',
    descriptionLongue: 'Le OnePlus 12 combine performance de pointe et charge ultra-rapide.',
    stock: 18,
    image: '/o1.jpg',
    caracteristiques: ['Écran AMOLED 6.7"', 'Snapdragon 8 Gen 3', 'Triple caméra Hasselblad 50MP', '256GB', 'Charge 100W', '5G'],
    actif: true
  },
  {
    nom: 'Xiaomi 14 Pro',
    marque: 'Xiaomi',
    categorie: 'smartphone',
    prix: 590000,
    ancienPrix: 720000,
    description: 'Excellent rapport qualité-prix',
    descriptionLongue: 'Le Xiaomi 14 Pro offre des spécifications flagship à un prix accessible.',
    stock: 25,
    image: '/x1.jpg',
    caracteristiques: ['Écran AMOLED 6.73"', 'Snapdragon 8 Gen 3', 'Triple caméra Leica 50MP', '256GB', 'Charge 120W', '5G'],
    actif: true
  },
  {
    nom: 'MacBook Pro 16"',
    marque: 'Apple',
    categorie: 'electronique',
    prix: 1500000,
    ancienPrix: 1800000,
    description: 'Ordinateur portable professionnel',
    descriptionLongue: 'MacBook Pro avec puce M3 Pro pour les professionnels exigeants.',
    stock: 8,
    image: '/',
    caracteristiques: ['Écran Liquid Retina XDR 16"', 'Puce M3 Pro', '16GB RAM', '512GB SSD', 'macOS'],
    actif: true
  },
  {
    nom: 'iPad Air',
    marque: 'Apple',
    categorie: 'electronique',
    prix: 450000,
    ancienPrix: 550000,
    description: 'Tablette polyvalente',
    descriptionLongue: 'iPad Air léger et puissant pour le travail et le divertissement.',
    stock: 12,
    image: '/',
    caracteristiques: ['Écran Liquid Retina 10.9"', 'Puce M1', '64GB', 'Touch ID', 'Compatible Apple Pencil'],
    actif: true
  },
  {
    nom: 'Villa Moderne Douala',
    marque: 'Immobilier',
    categorie: 'immobilier',
    prix: 85000000,
    ancienPrix: 95000000,
    description: 'Villa 4 chambres avec piscine',
    descriptionLongue: 'Magnifique villa moderne située dans un quartier résidentiel calme de Douala.',
    stock: 1,
    image: '/',
    caracteristiques: ['4 chambres', 'Piscine', 'Garage 2 voitures', 'Jardin', 'Sécurité 24/7'],
    actif: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️  Database cleared');

    // Create admin user
    const adminUser = await User.create({
      nom: 'Admin',
      prenom: 'BestLife',
      email: 'admin@bestlife.com',
      motDePasse: 'admin123',
      role: 'admin'
    });
    console.log('👤 Admin user created:', adminUser.email);

    // Create test client user
    const clientUser = await User.create({
      nom: 'Test',
      prenom: 'Client',
      email: 'client@bestlife.com',
      motDePasse: 'client123',
      role: 'client'
    });
    console.log('👤 Client user created:', clientUser.email);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`📦 ${createdProducts.length} products created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@bestlife.com / admin123');
    console.log('   Client: client@bestlife.com / client123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
