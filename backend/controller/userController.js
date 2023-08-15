const UserDetails = require("../model/userDetailsModel");
const mongoose = require("mongoose");
const { statusUpdate } = require("../utils/friendStatusUpdate");
const { FriendListUpdate } = require("../utils/usersListUpdate");
const sendToken = require("../utils/jwtToken");
const { updateField } = require("../utils/updateFiels");

exports.register = async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;
  console.log(name, email, phoneNumber, password);

  if (name == "" || email == "" || phoneNumber == "" || password == "") {
    return res.status(201).json({
      success: false,
      message: "You need to fill all the field to register!!",
    });
  }
  if (phoneNumber.length !== 10) {
    return res.status(400).json({
      success: false,
      message: "You entered invalid phone number!!",
    });
  }

  try {
    const user = await UserDetails.create(req.body);
    FriendListUpdate(user._id);
    sendToken(user, 200, res);

    return res.status(200).json({
      user,
      success: true,
      message: "User Registered successfully",
    });
  } catch (err) {
    console.error("An error occurred:", err);

    return res.status(500).json({
      error: "An error occurred while registering",
    });
  }

  // next();
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({
      success: false,
      message: "Please Enter Email and Password!!",
    });
  }

  const user = await UserDetails.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password!!",
    });
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password!!",
    });
  }

  sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

exports.requestFriend = async (req, res, next) => {
  const userId = req.user._id,
    friendId = req.params.id,
    friendStatusInMyList = 1,
    myStatusInFriendList = 2,
    message = "Request sent successfully";
  statusUpdate(
    userId,
    friendId,
    friendStatusInMyList,
    myStatusInFriendList,
    message,
    res
  );
};

exports.confirmFriend = async (req, res, next) => {
  const userId = req.user._id,
    friendId = req.params.id,
    friendStatusInMyList = 3,
    myStatusInFriendList = 3,
    message = "Request confirmed successfully";

  statusUpdate(
    userId,
    friendId,
    friendStatusInMyList,
    myStatusInFriendList,
    message,
    res
  );
};

exports.removeFriend = async (req, res, next) => {
  // console.log(req.user);
  const userId = req.user._id,
    friendId = req.params.id,
    friendStatusInMyList = 0,
    myStatusInFriendList = 0,
    message = "Connection removed successfully";
  statusUpdate(
    userId,
    friendId,
    friendStatusInMyList,
    myStatusInFriendList,
    message,
    res
  );
};

exports.getConnectedFriends = async (req, res, next) => {
  const userId = req.user._id;
  const friendStatus = 3;
  const message = "Lists of connected Friends";
  friendList(userId, friendStatus, message, res);
};

exports.pendingRequests = async (req, res, next) => {
  const userId = req.user._id;
  const friendStatus = 2;
  const message = "Lists of pending requests";
  friendList(userId, friendStatus, message, res);
};

exports.requestedFriends = async (req, res, next) => {
  const userId = req.user._id;
  const friendStatus = 1;
  const message = "Lists of friend requests";
  friendList(userId, friendStatus, message, res);
};

exports.notConnectedFriends = async (req, res, next) => {
  const userId = req.user._id;
  const friendStatus = 0;
  const message = "Lists of not Connected users";
  friendList(userId, friendStatus, message, res);
};

exports.updateProfile = async (req, res, next) => {
  const userId = req.user._id;
  const url = await req.file.path;
  updateField(userId, "avatar.url", url);
};

exports.updateName = async (req, res, next) => {
  const userId = req.user._id;
  const name = req.body.name;
  // console.log(req.body.name);
  updateField(userId, "name", name);
};

exports.updateEmail = async (req, res, next) => {
  const userId = req.user._id;
  const email = req.body.email;
  updateField(userId, "email", email);
};

exports.updatePhoneNumber = async (req, res, next) => {
  const userId = req.user._id;
  const phoneNumber = req.body.phoneNumber;
  updateField(userId, "phoneNumber", phoneNumber);
};

exports.addSkill = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);
  const skill = req.body;
  try {
    const result = await UserDetails.updateOne(
      { _id: userId },
      { $push: { Skills: skill } }
    );

    res.status(200).json({
      result,
      message: "skill added successfully",
    });
  } catch (err) {
    console.log("error is : ", err);
    res.status(500).json({
      message: "error occured while adding skill",
    });
  }
};

exports.updateSkill = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user._id.toString());
  const skillId = new mongoose.Types.ObjectId(req.body._id.toString());
  const skill = req.body.skill;

  try {
    const result = await UserDetails.updateOne(
      { _id: userId, "Skills._id": skillId },
      { $set: { "Skills.$.skill": skill } }
    );

    res.status(200).json({
      result,
      message: "skill updated successfully",
    });
  } catch (err) {
    console.log("error is : ", err);
    res.status(500).json({
      message: "error occured while updating skill",
    });
  }
};

exports.deleteSkill = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user._id.toString());
  const skillId = new mongoose.Types.ObjectId(req.body._id.toString());
  const skill = req.body.skill;

  try {
    const result = await UserDetails.updateOne(
      { _id: userId, "Skills._id": skillId },
      { $pull: { Skills: { skill: skill } } }
    );

    res.status(200).json({
      result,
      message: "skill updated successfully",
    });
  } catch (err) {
    console.log("error is : ", err);
    res.status(500).json({
      message: "error occured while deleting skill",
    });
  }
};

exports.getSkills = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user._id.toString());

  try {
    const user = await UserDetails.findOne({ _id: userId });

    const skills = user.Skills;

    res.status(200).json({
      skills,
      message: "lists of skills are here"
    })
  } catch (err) {
    console.log("error is: ", err);
    res.status(200).json({
      message: "error occurred while getting lists"
    })
  }

};
