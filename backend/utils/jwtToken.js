const sendToken = async(user, statusCode, res, message) => {
  const token = await user.getJWToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
    message
  });
};

module.exports = sendToken;
