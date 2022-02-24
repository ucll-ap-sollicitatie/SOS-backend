// Contains all the queries for the table 'question categories'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `
      (SELECT question_category_id, category, COUNT(question_id) AS amount_of_questions 
      FROM question_categories JOIN questions USING(question_category_id)
      GROUP BY question_category_id, category)
      UNION
      (SELECT question_category_id, category, COUNT(question_id) AS amount_of_questions 
      FROM question_categories FULL OUTER JOIN questions USING(question_category_id)
      GROUP BY question_category_id, category)
      ORDER BY amount_of_questions DESC`,
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
    db.query("SELECT * FROM question_categories WHERE question_category_id = $1", [question_category_id], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve(results.rows[0]);
      } else {
        reject("Question category not found.");
      }
    });
  });
};

const findOneByName = (category) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM question_categories WHERE category = $1", [category], (err, results) => {
      if (err) reject(err);
      if (results.rowCount == 1) {
        resolve(results.rows[0]);
      } else {
        reject("Question category not found.");
      }
    });
  });
};

const add = (category) => {
  return new Promise((resolve, reject) => {
    findOneByName(category)
      .then(() => {
        reject("Question category already exists.");
      })
      .catch(() => {
        db.query("INSERT INTO question_categories (category) VALUES ($1)", [category], (err, results) => {
          if (err) reject(err);
          resolve("Question category added.");
        });
      });
  });
};

const update = (question_category_id, category) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE question_categories SET category = $1 WHERE question_category_id = $2 RETURNING question_category_id",
      [category, question_category_id],
      (err, results) => {
        if (err || !results.rowCount) throw err;
        if (results.rowCount == 1) {
          resolve("Question category updated.");
        } else {
          reject(`Question category with id ${question_category_id} does not exist.`);
        }
      }
    );
  });
};

const deleteOne = (question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM questions WHERE question_category_id = $1 RETURNING question_category_id", [question_category_id], () => {
      db.query(
        "DELETE FROM question_categories WHERE question_category_id = $1 RETURNING question_category_id",
        [question_category_id],
        (err, results) => {
          if (err) reject(err);
          if (results.rowCount == 1) {
            resolve("Question category deleted.");
          } else {
            reject(`Question category #${question_category_id} does not exist.`);
          }
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
  deleteOne,
  update,
};
