const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('cloudinary').v2;

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