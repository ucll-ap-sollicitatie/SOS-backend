// Contains all the queries for the table 'queston categories'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM question_categories ORDER BY question_category_id ASC",
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount != 0) {
          resolve(results.rows);
        } else {
          reject("No question categories.");
        }
      }
    );
  });
};

const findOneById = (question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM question_categories WHERE question_category_id = $1",
      [question_category_id],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("Question category not found.");
        }
      }
    );
  });
};

const findOneByName = (category) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM question_categories WHERE category = $1",
      [category],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("Question category not found.");
        }
      }
    );
  });
};

const add = (category) => {
  return new Promise((resolve, reject) => {
    findOneByName(category)
      .then(() => {
        reject("Question category already exists.");
      })
      .catch(() => {
        db.query(
          "INSERT INTO question_categories (category) VALUES ($1)",
          [category],
          (err, results) => {
            if (err) reject(err);
            resolve("Question category added.");
          }
        );
      });
  });
};

module.exports = {
  findAll,
  findOneById,
  findOneByName,
  add,
};
