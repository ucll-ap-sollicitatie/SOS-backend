// Contains all the queries for the table 'comments'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments ORDER BY comment_id ASC", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No comments found.");
      }
    });
  });
};

const findAllByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT comment_id, date, text, name, surname, author, feedback FROM comments c INNER JOIN users u ON c.author = u.r_u_number WHERE video_id = $1 AND feedback = false ORDER BY date DESC",
      [video_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount != 0) {
          resolve(results.rows);
        } else {
          reject("No comments found.");
        }
      }
    );
  });
};

const findAllFeedbackByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT comment_id, date, text, name, surname, author, feedback FROM comments c INNER JOIN users u ON c.author = u.r_u_number WHERE video_id = $1 AND feedback = true ORDER BY date DESC",
      [video_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount != 0) {
          resolve(results.rows);
        } else {
          reject("No feedback found.");
        }
      }
    );
  });
};

const findOne = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve(results.rows[0]);
      } else {
        reject("Comment not found.");
      }
    });
  });
};

const add = (text, author, video_id, feedback) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO comments (text, author, video_id, feedback) VALUES ($1, $2, $3, $4)",
      [text, author, video_id, feedback],
      (err, results) => {
        if (err) reject(err);
        resolve("Comment added.");
      }
    );
  });
};

const update = (text, comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE comments SET text = $1 WHERE comment_id = $2 RETURNING comment_id", [text, comment_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve("Comment updated.");
      } else {
        reject(`Comment #${comment_id} does not exist.`);
      }
    });
  });
};

const deleteOne = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM comments WHERE comment_id = $1", [comment_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve("Comment deleted.");
      } else {
        reject(`Comment #${comment_id} does not exist.`);
      }
    });
  });
};

module.exports = {
  findAll,
  findAllByVideo,
  findAllFeedbackByVideo,
  findOne,
  add,
  update,
  deleteOne,
};
