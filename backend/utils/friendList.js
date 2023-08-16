const mongoose = require('mongoose');
const UserDetails = require("../model/userDetailsModel");

exports.friendList = async (userId, friendStatus, message, res) => {
   userId = new mongoose.Types.ObjectId(userId.toString());

  try {
    const Lists = await UserDetails.find({
      _id: userId,
      "friend.status": friendStatus,
    });

    console.log(Lists);

    res.status(200).json({
      Lists,
      message,
    });
  } catch (err) {
    console.log("error is : ", err);
    res.status(500).json({
      message: "error occured while getting lists",
    });
  }
};
