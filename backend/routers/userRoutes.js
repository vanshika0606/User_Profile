const express = require("express");
const {
  register,
  loginUser,
  logout,
  updateProfile,
  requestFriend,
  confirmFriend,
  removeFriend,
  getConnectedFriends,
  pendingRequests,
  requestedFriends,
  notConnectedFriends,
  updateName,
  updateEmail,
  updatePhoneNumber,
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} = require("../controller/userController");
const { uploadImage } = require("../middleware/upload");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register); //working
router.route("/login").post(loginUser); //working
router.route("/logout").get(isAuthenticatedUser, logout); //working
router
  .route("/updateProfile")
  .patch(isAuthenticatedUser, uploadImage.single("file"), updateProfile); //working
router.route("/requestFriend/:id").patch(isAuthenticatedUser, requestFriend); //working
router.route("/confirmFriend/:id").patch(isAuthenticatedUser, confirmFriend); //working
router.route("/removeFriend/:id").patch(isAuthenticatedUser, removeFriend); //working
router.route("/connectedFriends").get(isAuthenticatedUser, getConnectedFriends); //working
router.route("/pendingRequests").get(isAuthenticatedUser, pendingRequests); //working
router.route("/requested").get(isAuthenticatedUser, requestedFriends); //working
router.route("/notConnected").get(isAuthenticatedUser, notConnectedFriends); //working
router.route("/updateName").patch(isAuthenticatedUser, updateName); //working
router.route("/updateEmail").patch(isAuthenticatedUser, updateEmail); //working
router
  .route("/updatephoneNumber")
  .patch(isAuthenticatedUser, updatePhoneNumber); //working
router.route("/getSkills").get(isAuthenticatedUser, getSkills);   //working
router.route("/addSkill").post(isAuthenticatedUser, addSkill);    //working
router
  .route("/skill/:id")
  .patch(isAuthenticatedUser, updateSkill)
  .delete(isAuthenticatedUser, deleteSkill);    //working

module.exports = router;
