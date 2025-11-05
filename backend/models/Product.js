const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true
  },
  marque: {
    type: String,
    required: [true, 'La marque est requise'],
    trim: true
  },
  categorie: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['smartphone', 'electronique', 'immobilier']
  },
  prix: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix doit être positif']
  },
  ancienPrix: {
    type: Number,
    min: [0, 'L\'ancien prix doit être positif']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true
  },
  descriptionLongue: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock doit être positif'],
    default: 0
  },
  image: {
    type: String,
    default: '/placeholder.jpg'
  },
  caracteristiques: [{
    type: String
  }],
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ nom: 'text', marque: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
