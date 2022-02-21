// Contains all the queries for the table 'formations'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations ORDER BY formation_id ASC", (err, results) => {
      if (err) reject(err);
      if (results.rowCount != 0) {
        resolve(results.rows);
      } else {
        reject("No formations found.");
      }
    });
  });
};

const findOneById = (formation_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations WHERE formation_id = $1", [formation_id], (err, results) => {
      if (err) reject(err);
      checkSingleRow(resolve, reject, results.rowCount, results);
    });
  });
};

const findOneByName = (formation_name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations WHERE formation = $1", [formation_name], (err, results) => {
      if (err) reject(err);
      checkSingleRow(resolve, reject, results.rowCount, results);
    });
  });
};

const checkSingleRow = (resolve, reject, count, results) => {
  if (count == 1) {
    resolve(results.rows);
  } else {
    reject("Formation not found.");
  }
};

module.exports = {
  findAll,
  findOneById,
  findOneByName,
};
