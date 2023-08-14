const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./database/db");

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
