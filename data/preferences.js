// Contains all the queries for the table 'preferences'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences ORDER BY preference_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findOneById = (preference_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences WHERE preference_id = $1", [preference_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const findOneByRUNumber = (preference_r_u_number) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences WHERE r_u_number = $1", [preference_r_u_number], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const add = (r_u_number, preference_1, preference_2, preference_3) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO preferences (r_u_number, preference_1, preference_2, preference_3) VALUES ($1, $2, $3, $4)",
      [r_u_number, preference_1, preference_2, preference_3],
      (err, results) => {
        queryHelpers.handleQueryAdd(resolve, reject, err, "Preferences");
      }
    );
  });
};

module.exports = {
  findAll,
  findOneById,
  findOneByRUNumber,
  add,
};
