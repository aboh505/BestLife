const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    console.log('📝 Create Order - Request Body:', JSON.stringify(req.body, null, 2));
    
    // Accept both 'articles' and 'produits' for flexibility
    const articles = req.body.articles || req.body.produits;
    const { total, adresseLivraison } = req.body;

    if (!articles || articles.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Le panier est vide',
        received: req.body
      });
    }

    // Verify stock availability and update
    for (let article of articles) {
      const product = await Product.findById(article.produit);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Produit ${article.nom} non trouvé`
        });
      }

      if (product.stock < article.quantite) {
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${product.nom}`
        });
      }

      // Decrease stock
      product.stock -= article.quantite;
      await product.save();
    }

    const order = await Order.create({
      utilisateur: req.user._id,
      articles,
      total,
      adresseLivraison
    });

    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ utilisateur: req.user._id })
      .populate('articles.produit', 'nom image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('utilisateur', 'nom prenom email')
      .populate('articles.produit', 'nom image prix');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    // Check if user owns the order or is admin
    if (order.utilisateur._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Non autorisé à voir cette commande'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('utilisateur', 'nom prenom email')
      .populate('articles.produit', 'nom image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    // Accept both 'statut' and 'status'
    const statut = req.body.statut || req.body.status;

    if (!statut) {
      return res.status(400).json({
        success: false,
        message: 'Le statut est requis'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { statut },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Statut de la commande mis à jour',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
