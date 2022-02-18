1; // Contains all the queries for the table 'videos'
const db = require("../configuration/db");
const credentials = require("../configuration/secret");
const cloudinary = require("cloudinary");
cloudinary.config(credentials.cloudinaryConfig);

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos ORDER BY video_id ASC", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No videos found.");
      }
    });
  });
};

const findOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM videos WHERE video_id = $1",
      [video_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("Video not found.");
        }
      }
    );
  });
};

const add = (title, r_u_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO videos (title, r_u_number) VALUES ($1, $2)",
      [title, r_u_number],
      (err, results) => {
        if (err) reject(err);
        resolve("Video added.");
      }
    );
  });
};

const uploadVideo = (video_file) => {
  return cloudinary.v2.uploader.upload(video_file.tempFilePath, {
    resource_type: "auto",
    public_id: `SOS/${video_file.name}`,
  });
};

const update = (title, video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE videos SET title = $1 WHERE video_id = $2 RETURNING video_id",
      [title, video_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve("Video updated.");
        } else {
          reject(`Video #${video_id} not found.`);
        }
      }
    );
  });
};

const deleteOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM videos WHERE video_id = $1 RETURNING video_id",
      [video_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve("Video deleted.");
        } else {
          reject(`Video #${video_id} not found.`);
        }
      }
    );
  });
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
  uploadVideo,
};
