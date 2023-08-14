const express = require('express');
const { Register, loginUser, logout, UpdateProfile, AddFriends, allUser, FriendListUpdate } = require('../controller/userController');
const {uploadImage} = require('../middleware/upload');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
router.route('/updateProfile').patch(isAuthenticatedUser, uploadImage.single('file'), UpdateProfile);
router.route('/addFriend').get(isAuthenticatedUser, AddFriends);

module.exports = router;