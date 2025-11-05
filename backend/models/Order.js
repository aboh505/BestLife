const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  articles: [{
    produit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nom: String,
    prix: Number,
    quantite: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    enum: ['En préparation', 'Expédiée', 'Livrée', 'Annulée'],
    default: 'En préparation'
  },
  adresseLivraison: {
    rue: String,
    ville: String,
    codePostal: String,
    telephone: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
