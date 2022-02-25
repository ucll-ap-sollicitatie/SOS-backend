// Contains all the queries for the table 'comments'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      SELECT comment_id, date, text, name, surname, author, feedback, count(l.email) as likes FROM comments c
      INNER JOIN users u ON c.author = u.r_u_number
      LEFT JOIN liked_comments l USING(comment_id)
      GROUP BY comment_id, name, surname
      ORDER BY comment_id ASC`,
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `   
      SELECT comment_id, date, text, name, surname, author, feedback, count(l.email) as likes FROM comments c
      INNER JOIN users u ON c.author = u.r_u_number
      LEFT JOIN liked_comments l USING(comment_id)
      WHERE video_id = $1 AND feedback = false 
      GROUP BY comment_id, name, surname
      ORDER BY date DESC`,
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

const addLike = (email, comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO liked_comments(email, comment_id) values ($1, $2)", [email, comment_id], (err, results) => {
      queryHelpers.handleQueryAdd(resolve, reject, err, "Like to comment");
    });
  });
};

const removeLike = (email, comment_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM liked_comments WHERE email = $1 AND comment_id = $2", [email, comment_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Like from comment");
    });
  });
};

const checkLike = (comment_id, email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from liked_comments WHERE comment_id = $1 AND email = $2", [comment_id, email], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
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
  addLike,
  removeLike,
  checkLike,
};
