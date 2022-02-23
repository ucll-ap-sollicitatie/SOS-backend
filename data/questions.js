// Contains all the queries for the table 'questions'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions ORDER BY question_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findOne = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions WHERE question_id = $1", [question_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const findOneByQuestion = (question) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions WHERE question = $1", [question], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const check = (question, question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM questions WHERE question = $1 AND question_category_id = $2",
      [question, question_category_id],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const add = (question, question_category_id) => {
  return new Promise((resolve, reject) => {
    check(question, question_category_id)
      .then(() => {
        reject("Question already exists.");
      })
      .catch(() => {
        db.query(
          "INSERT INTO questions (question, question_category_id) VALUES ($1, $2)",
          [question, question_category_id],
          (err, results) => {
            queryHelpers.handleQueryAdd(resolve, reject, err, "Question");
          }
        );
      });
  });
};

const update = (question_id, question) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE questions SET question = $1 WHERE question_id = $2 RETURNING question_id", [question, question_id], (err, results) => {
      queryHelpers.handleQueryUpdate(resolve, reject, err, "Question");
    });
  });
};

const deleteOne = (question_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM questions WHERE question_id = $1 RETURNING question_id", [question_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Question");
    });
  });
};

const findAllQuestionsByQuestionCategory = (question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions WHERE question_category_id = $1", [question_category_id], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findRandomQuestions = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions ORDER BY RANDOM() LIMIT 5", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No questions found.");
      }
    });
  });
};

const findRandomQuestions = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM questions ORDER BY RANDOM() LIMIT 5", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No questions found.");
      }
    });
  });
};

module.exports = {
  findAll,
  findOne,
  add,
  update,
  deleteOne,
  findAllQuestionsByQuestionCategory,
  findRandomQuestions,
};
