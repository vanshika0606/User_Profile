const friendList = async (userId, friendStatus, message, res) => {
  const userId = new mongoose.Types.ObjectId(userId.toString());

  try {
    const Lists = await UserDetails.find({
      _id: { $ne: userId },
      "friend.status": friendStatus,
    });

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
