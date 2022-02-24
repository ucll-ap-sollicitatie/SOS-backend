const db = require("../configuration/db");
const queryHelpers = require("../helpers/queryHelpers");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { resolve } = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  db,
  queryHelpers,
  cloudinary,
  bcrypt,
  crypto,
  resolve,
};
