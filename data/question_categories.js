// Contains all the queries for the table 'question categories'
const { db, queryHelpers } = require("./index");

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
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOneById = (question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM question_categories WHERE question_category_id = $1", [question_category_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const findOneByName = (category) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM question_categories WHERE category = $1", [category], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const add = (category) => {
  return new Promise((resolve, reject) => {
    findOneByName(category)
      .then(() => {
        reject("Question category already exists.");
        return;
      })
      .catch(() => {
        db.query("INSERT INTO question_categories (category) VALUES ($1)", [category], (err, results) => {
          queryHelpers.handleQueryAdd(resolve, reject, err, "Category");
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
        queryHelpers.handleQueryUpdate(resolve, reject, err, "Category");
      }
    );
  });
};

const deleteOne = (question_category_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM questions WHERE question_category_id = $1 RETURNING question_category_id",
      [question_category_id],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        if (results.rowCount === 0 || results.rowCount === 1) {
          db.query(
            "DELETE FROM question_categories WHERE question_category_id = $1 RETURNING question_category_id",
            [question_category_id],
            (err, results) => {
              queryHelpers.handleQueryDelete(resolve, reject, err, "Category");
            }
          );
        } else {
          reject(`Question #${question_category_id} does not exist.`);
        }
      }
    );
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
