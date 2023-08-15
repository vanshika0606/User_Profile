const express = require('express');
const { register, loginUser, logout, updateProfile, requestFriend, confirmFriend, removeFriend, getConnectedFriends, pendingRequests, requestedFriends, notConnectedFriends, updateName, updateEmail, updatePhoneNumber, getSkills } = require('../controller/userController');
const {uploadImage} = require('../middleware/upload');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
router.route('/updateProfile').patch(isAuthenticatedUser, uploadImage.single('file'), updateProfile);
router.route('/requestFriend/:id').get(isAuthenticatedUser, requestFriend);
router.route('/confirmFriend/:id').get(isAuthenticatedUser, confirmFriend);
router.route('/removeFriend/:id').get(isAuthenticatedUser, removeFriend);
router.route('/connectedFriends').get(isAuthenticatedUser, getConnectedFriends);
router.route('/pendingRequests').get(isAuthenticatedUser, pendingRequests);
router.route('/requested').get(isAuthenticatedUser, requestedFriends);
router.route('/notConnected').get(isAuthenticatedUser, notConnectedFriends);
router.route('/updateName').patch(isAuthenticatedUser, updateName);
router.route('/updateEmail').patch(isAuthenticatedUser, updateEmail);
router.route('/updatephoneNumber').patch(isAuthenticatedUser, updatePhoneNumber);
router.route('/getSkills').get(isAuthenticatedUser, getSkills);

module.exports = router;