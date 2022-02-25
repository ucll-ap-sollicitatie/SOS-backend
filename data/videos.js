// Contains all the queries for the table 'videos'
require("dotenv").config();
const { db, cloudinary, queryHelpers, fs } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos ORDER BY video_id DESC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findAllByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findAllPublicByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM videos WHERE email = $1 AND private = false", [email], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, v.r_u_number, u.name, u.surname FROM videos v inner join users u using(r_u_number) WHERE video_id = $1",
      [video_id],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const add = (title, r_u_number, email, description, videoUrl, private) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO videos (title, r_u_number, email, description, video_url, private) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, r_u_number, email, description, videoUrl, private],
      (err, results) => {
        queryHelpers.handleQueryAdd(resolve, reject, err, "Video");
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

const uploadSubtitles = (subtitles, video_file, email) => {
  fs.writeFile("tmp/subtitles.srt", subtitles, (err) => {
    if (err) throw err;
  })
  return cloudinary.v2.uploader.upload(`tmp/subtitles.srt`, {
    resource_type: "raw",
    public_id: `SOS/${email}/${video_file.name}.srt`,
  });
};

const update = (title, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE videos SET title = $1 WHERE video_id = $2 RETURNING video_id", [title, video_id], (err, results) => {
      queryHelpers.handleQueryUpdate(resolve, reject, err, "Video");
    });
  });
};

const deleteOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM videos WHERE video_id = $1 RETURNING video_id", [video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Video");
    });
  });
};

module.exports = {
  findAll,
  findAllByEmail,
  findAllPublicByEmail,
  findOne,
  add,
  update,
  deleteOne,
  uploadVideo,
  uploadSubtitles,
};
