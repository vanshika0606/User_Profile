const mongoose = require('mongoose');
const UserDetails = require("../model/userDetailsModel");

exports.friendList = async (userId, friendStatus, message, res) => {
   userId = new mongoose.Types.ObjectId(userId.toString());

  try {
    
    const result = await UserDetails.aggregate([
      {
        $match: { _id: userId} 
      },
      {
        $unwind: "$friends" 
      },
      {
        $match: { "friends.status": friendStatus } 
      },
      {
        $lookup: {
          from: "users", 
          localField: "friends.user",
          foreignField: "_id",
          as: "friendData" 
        }
      },
      {
        $project: {
          _id: 1,
          friendData: 1
        }
      }
    ])
    
    // console.log(result);

    res.status(200).json({
      // Lists,
      result,
      message,
    });
  } catch (err) {
    console.log("error is : ", err);
    res.status(500).json({
      message: "error occured while getting lists",
    });
  }
};
