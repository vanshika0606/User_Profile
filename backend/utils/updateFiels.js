const mongoose = require("mongoose");
const UserDetails = require("../model/userDetailsModel");

exports.updateField = async (userId, fieldName, fieldData) => {
  userId = new mongoose.Types.ObjectId(userId.toString());

  const message = `${fieldName} updated successfully`

  try {
    const updatePhoto = await UserDetails.updateOne(
      { _id: userId },
      { [fieldName]: fieldData }
    );

    console.log(updatePhoto);
    res.status(200).json({
      message
    })

  } catch (err) {
    console.log("error is: ", err);
    res.status(500).json({
      message: `error occured while updating ${fieldName}`
    })
  }
};
