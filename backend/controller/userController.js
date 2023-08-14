const UserDetails = require("../model/userDetailsModel");
const mongoose = require("mongoose");

exports.Register = async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;
  console.log(name, email, phoneNumber, password);

  if (name == "" || email == "" || phoneNumber == "" || password == "") {
    return res.status(201).json({
      success: false,
      message: "You need to fill all the field to register!!",
    });
  }
  if (phoneNumber.toString().length !== 10) {
    return res.status(400).json({
      success: false,
      message: "You entered invalid phone number!!",
    });
  }
  const user = await UserDetails.create(req.body);
  const token = user.getJWToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  console.log(options);

  this.FriendListUpdate(user._id);

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "Registered successfully!",
  });

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

  const token = user.getJWToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  return res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
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

// exports.NewUser = async (req, res, next) => {
//   const allUser = await UserDetails.updateMany({
//     // _id: { $ne: req.user.id },
//     // $push: { friends: { user: req.user._id, status: 0 } },
//   })
//     .update({
//       $push: { friends: { user: req.user._id, status: 0 } },
//     })
//     .exec((err, result) => {
//       if (err) {
//         console.error("Error:", err);
//       } else {
//         console.log("Number of Documents Updated:", result.nModified);
//       }
//     });
//   console.log("mm");
//   // console.log(allUser);
// };

exports.FriendListUpdate = async ( userId ) => {
  const id = new mongoose.Types.ObjectId( userId.toString());

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

  console.log("all users are: ",allUser);
  const friend = [];

  for (const user of allUser) {
    const id = new mongoose.Types.ObjectId(user._id.toString());
    friend.push({
      user: id,
      status: 0,
    });
  }

  console.log("object of friends for my data: ", friend);

  const myData = await UserDetails.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        friends: friend,
      },
    }
  );

  console.log("my Data: ", myData);

  // const allUser = await UserDetails.find
};

exports.AddFriends = async (req, res, next) => {
  // console.log(req.user._id);
  // this.NewUser();
  this.allUser();
  // console.log(user.);
};

exports.UpdateProfile = async (req, res, next) => {
  console.log(req.file);
};
