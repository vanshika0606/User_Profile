const express = require('express');
const { register, loginUser, logout, UpdateProfile, requestFriend, confirmFriend, removeFriend } = require('../controller/userController');
const {uploadImage} = require('../middleware/upload');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
router.route('/updateProfile').patch(isAuthenticatedUser, uploadImage.single('file'), UpdateProfile);
router.route('/requestFriend/:id').get(isAuthenticatedUser, requestFriend);
router.route('/confirmFriend/:id').get(isAuthenticatedUser, confirmFriend);
router.route('/removeFriend/:id').get(isAuthenticatedUser, removeFriend);

module.exports = router;