// Contains all the queries for the table 'roles'
const db = require("../configuration/db");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles ORDER BY role_id ASC", (err, results) => {
      if (err) reject(err)
      resolve(results.rows)
    });
  })
};

module.exports = {
  findAll
}