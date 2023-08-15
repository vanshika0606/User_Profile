exports.statusUpdate = async (
  userId,
  friendId,
  friendStatusInMyList,
  myStatusInFriendList,
  message,
  res
) => {
  friendId = new mongoose.Types.ObjectId(friendId.toString());
  userId = new mongoose.Types.ObjectId(userId.toString());

  try {
    const updateMyList = await UserDetails.updateOne(
      {
        _id: userId,
        "friends.user": friendId,
      },
      { $set: { "friends.$.status": friendStatusInMyList } }
    );
    const UpdateFriendList = await UserDetails.updateOne(
      {
        _id: friendId,
        "friends.user": userId,
      },
      { $set: { "friends.$.status": myStatusInFriendList } }
    );

    console.log("My list Updated: ", updateMyList);
    console.log("Friend list updated: ", UpdateFriendList);

    return res.status(200).json({ message });
  } catch (err) {
    console.log("error is : ", err);
    return res.status(500).json({
      message: "error occurred while updating friends and my status",
    });
  }
};
