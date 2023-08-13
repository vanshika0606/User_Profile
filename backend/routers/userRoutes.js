const express = require('express');
const { Register, loginUser, logout, uploadImage, UpdateProfile } = require('../controller/userController');

const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/updateProfile').patch(uploadImage.single('file'), UpdateProfile);

module.exports = router;