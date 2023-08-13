const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = connectDatabase;

