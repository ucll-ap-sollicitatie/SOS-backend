// Contains all the queries for the table 'roles'
const db = require("../configuration/db");

const getAllRoles = (req, res) => {
  console.log(`Request for all roles`);
  db.query("SELECT * FROM roles ORDER BY role_id ASC", (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getAllRoles,
};
