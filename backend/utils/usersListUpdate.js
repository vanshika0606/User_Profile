const mongoose = require('mongoose');
const UserDetails = require('../model/userDetailsModel');

exports.FriendListUpdate = async (userId) => {
  const id = new mongoose.Types.ObjectId(userId.toString());

  const result = await UserDetails.updateMany(
    {
      _id: { $ne: id },
    },
    {
      $push: {
        friends: { user: id, status: 0 },
      },
    }
  );
  const allUser = await UserDetails.find({ _id: { $ne: id } });
  // console.log("all users are: ", allUser);
  let friend = [];

  for (const user of allUser) {
    const id = new mongoose.Types.ObjectId(user._id.toString());
    friend.push({
      user: id,
      status: 0,
    });
  }

  // console.log("object of friends for my data: ", friend);

  const myData = await UserDetails.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        friends: friend,
      },
    }
  );

  // console.log("my Data: ", myData);
};
