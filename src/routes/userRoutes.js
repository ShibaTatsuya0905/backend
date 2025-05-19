const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { uploadAvatar } = require('../middleware/uploadMiddleware'); 

router.route('/profile')
    .get(protect, userController.getMyProfile)
    .put(protect, uploadAvatar.single('avatar'), userController.updateMyProfile);

module.exports = router;