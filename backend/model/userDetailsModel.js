const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please Enter Your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
  },
  avatar: {
    url: {
      type: String,
      //   required: true,
    },
  },
  about: {
    type: String,
  },
  Skills: [
    {
      skill: {
        type: String,
      },
    },
  ],
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      // enums: [0, 1, 2, 3], //0 - not connected,  1 - requested,  2 - pending, 3 - connected
      status: Number,
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

UserSchema.methods.getJWToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
