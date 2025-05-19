const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(postController.getPosts)
    .post(protect, postController.createPost);

router.get('/suggested/:currentPostId', postController.getSuggestedPosts);

router.route('/:idOrSlug')
    .get(postController.getPostById)
    .put(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;