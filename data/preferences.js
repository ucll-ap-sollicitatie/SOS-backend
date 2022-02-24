// Contains all the queries for the table 'preferences'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences ORDER BY preference_id ASC", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No preferences found.");
      }
    });
  });
};

const findOneById = (preference_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences WHERE preference_id = $1", [preference_id], (err, results) => {
      if (err) reject(err);
      checkSingleRow(resolve, reject, results.rowCount, results);
    });
  });
};

const findOneByRUNumber = (preference_r_u_number) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM preferences WHERE r_u_number = $1", [preference_r_u_number], (err, results) => {
        if (err) reject(err);
        checkSingleRow(resolve, reject, results.rowCount, results);
      });
    });
  };

const add = (r_u_number, preference_1, preference_2, preference_3) => {
return new Promise((resolve, reject) => {
    db.query("INSERT INTO preferences (r_u_number, preference_1, preference_2, preference_3) VALUES ($1, $2, $3, $4)", [r_u_number, preference_1, preference_2, preference_3], (err, results) => {
    if (err) reject(err);
    resolve("Preference added.");
    });
});
};

const checkSingleRow = (resolve, reject, count, results) => {
  if (count == 1) {
    resolve(results.rows);
  } else {
    reject("Preference not found.");
  }
};

module.exports = {
  findAll,
  findOneById,
  findOneByRUNumber,
  add,
};
