// Contains all the queries for the table 'comments'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments ORDER BY comment_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findAllByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT comment_id, date, text, name, surname, author, feedback FROM comments c INNER JOIN users u ON c.author = u.r_u_number WHERE video_id = $1 AND feedback = false ORDER BY date DESC",
      [video_id],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllFeedbackByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT comment_id, date, text, name, surname, author, feedback, start_feedback, end_feedback FROM comments c INNER JOIN users u ON c.author = u.r_u_number WHERE video_id = $1 AND feedback = true ORDER BY date DESC",
      [video_id],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOne = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comments WHERE comment_id = $1", [comment_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const add = (text, author, video_id, feedback, start_feedback, end_feedback) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO comments (text, author, video_id, feedback, start_feedback, end_feedback) VALUES ($1, $2, $3, $4, $5, $6) RETURNING comment_id",
      [text, author, video_id, feedback, start_feedback, end_feedback],
      (err, results) => {
        queryHelpers.handleQueryAdd(resolve, reject, err, "Comment");
      }
    );
  });
};

const update = (text, comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE comments SET text = $1 WHERE comment_id = $2 RETURNING comment_id", [text, comment_id], (err, results) => {
      queryHelpers.handleQueryUpdate(resolve, reject, err, "Comment");
    });
  });
};

const deleteOne = (comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING comment_id", [comment_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Comment");
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
