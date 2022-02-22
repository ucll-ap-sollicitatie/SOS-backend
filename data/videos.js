// Contains all the queries for the table 'videos'
require("dotenv").config();
const db = require("../configuration/db");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos ORDER BY video_id DESC", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No videos found.");
      }
    });
  });
};

const findAllByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos WHERE email = $1"),
      [email],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount != 0) {
          resolve(results.rows);
        } else {
          reject(`Videos for email ${email} not found.`);
        }
      };
  });
};

const findOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos WHERE video_id = $1", [video_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve(results.rows[0]);
      } else {
        reject("Video not found.");
      }
    });
  });
};

const add = (title, r_u_number, email, description, videoUrl, private) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO videos (title, r_u_number, email, description, video_url, private) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, r_u_number, email, description, videoUrl, private],
      (err, results) => {
        if (err) reject(err);
        resolve("Video added.");
      }
    );
  });
};

const uploadVideo = (video_file, email) => {
  return cloudinary.v2.uploader.upload(video_file.tempFilePath, {
    resource_type: "auto",
    public_id: `SOS/${email}/${video_file.name}`,
  });
};

const update = (title, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE videos SET title = $1 WHERE video_id = $2 RETURNING video_id", [title, video_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve("Video updated.");
      } else {
        reject(`Video #${video_id} not found.`);
      }
    });
  });
};

const deleteOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM videos WHERE video_id = $1 RETURNING video_id", [video_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve("Video deleted.");
      } else {
        reject(`Video #${video_id} not found.`);
      }
    });
  });
};


module.exports = {
  findAll,
  findAllByEmail,
  findOne,
  add,
  update,
  deleteOne,
  uploadVideo,
};
