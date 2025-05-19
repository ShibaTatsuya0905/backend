const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/authMiddleware'); 

router.route('/')
    .post(protect, authorize('admin'), categoryController.createCategory)
    .get(categoryController.getAllCategories);

router.route('/:slug') 
    .get(categoryController.getCategoryBySlug);

router.route('/:id')
    .put(protect, authorize('admin'), categoryController.updateCategory)
    .delete(protect, authorize('admin'), categoryController.deleteCategory);

module.exports = router;