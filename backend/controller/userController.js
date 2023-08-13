const UserDetails = require("../model/userDetailsModel");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary');
const multer = require("multer");

const storageImage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    transformation: [{ width: 500, height: 500, crop: "fill" }],
    format: "jpg",
    resource_type: "image",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

exports.uploadImage = multer({ storage: storageImage });


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

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "Registered successfully!",
  });
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

  res.status(200).cookie("token", token, options).json({
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

exports.AddFriends = async (req, res, next) => {};

exports.UpdateProfile = async (req, res, next) => {
  console.log("mmm");
  console.log(req.file);

};
