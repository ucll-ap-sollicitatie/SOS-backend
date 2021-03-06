// Contains all the queries for the table 'favorites'
const { db, queryHelpers } = require("./index");

const addFavorite = (email, video_id) => {
  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO favorites(email, video_id) values ($1, $2)`, [email, video_id], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findAllFavoritedVideosByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.user_id, v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, u.name, u.surname FROM videos v INNER JOIN favorites f USING(email) INNER JOIN users u USING(email) WHERE v.email = $1",
      [email],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllFavoritedVideos = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.user_id, v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, v.email, f.email as favorite_email, u.name, u.surname FROM videos v INNER JOIN favorites f USING(video_id) INNER JOIN users u ON v.email = u.email",
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const removeFavorite = (email, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM favorites WHERE email = $1 AND video_id = $2", [email, video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Favorite from video");
    });
  });
};

const deleteAllByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM favorites WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Favorite from video");
    });
  });
};

const checkVideoFavorite = (email, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from favorites WHERE email = $1 AND video_id = $2", [email, video_id], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const deleteAllByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM favorites WHERE video_id = $1", [video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Favorite from video");
    });
  });
};

const getRandomFavoritedVideos = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.user_id, v.video_id, title, v.date, v.video_url, v.email, v.description, v.private, v.email, f.email as favorite_email, u.name, u.surname FROM videos v INNER JOIN favorites f USING(video_id) INNER JOIN users u ON v.email = u.email WHERE v.private = false ORDER BY RANDOM() LIMIT 4",
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

module.exports = {
  addFavorite,
  findAllFavoritedVideos,
  findAllFavoritedVideosByEmail,
  removeFavorite,
  deleteAllByEmail,
  checkVideoFavorite,
  deleteAllByVideo,
  getRandomFavoritedVideos,
};
