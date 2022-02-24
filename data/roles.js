// Contains all the queries for the table 'roles'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles ORDER BY role_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

module.exports = {
  findAll,
};
