// Contains all the queries for the table 'formations'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations ORDER BY formation_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findOneById = (formation_id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations WHERE formation_id = $1", [formation_id], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const findOneByName = (formation_name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM formations WHERE formation = $1", [formation_name], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

module.exports = {
  findAll,
  findOneById,
  findOneByName,
};
