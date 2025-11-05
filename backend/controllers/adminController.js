const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Count totals
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ statut: { $ne: 'Annulée' } });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Recent orders
    const recentOrders = await Order.find()
      .populate('utilisateur', 'nom prenom email')
      .populate('articles.produit', 'nom')
      .sort({ createdAt: -1 })
      .limit(5);

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .sort({ stock: 1 })
      .limit(5);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$statut',
          count: { $sum: 1 }
        }
      }
    ]);

    // Products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$categorie',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totals: {
          users: totalUsers,
          products: totalProducts,
          orders: totalOrders,
          revenue: totalRevenue
        },
        recentOrders,
        lowStockProducts,
        ordersByStatus,
        productsByCategory
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get sales statistics
// @route   GET /api/admin/sales-stats
// @access  Private/Admin
exports.getSalesStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = { statut: { $ne: 'Annulée' } };

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const salesByDay = await Order.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          totalSales: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: salesByDay
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
