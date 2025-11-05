const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

// IMPORTANT: Specific routes must come before /:id routes
router.get('/brands', getBrands);
router.get('/brands/list', getBrands); // Support both endpoints

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
