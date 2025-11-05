const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSalesStats
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// All routes require authentication and admin role
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/sales-stats', getSalesStats);

module.exports = router;
