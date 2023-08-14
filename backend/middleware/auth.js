const jwt = require("jsonwebtoken");
const User = require("../model/userDetailsModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  // console.log(req.headers);
  const { token } = req.headers;
  // const { token } = req.headers.cookies;
  console.log(token);

  if (!token) {
    return next(
      res.status(401).json({
        success: true,
        message: "Please login to access this resource",
      })
    );
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData);

  req.user = await User.findById(decodedData.id);

  next();
};
