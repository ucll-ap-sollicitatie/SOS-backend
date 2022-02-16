// Contains all the queries for the table 'formations'
const db = require("../configuration/db");

const getAllFormations = (req, res) => {
  console.log(`Request for all formations`);
  db.query(
    "SELECT * FROM formations ORDER BY formation_id ASC",
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    }
  );
};

const getFormationById = (req, res) => {
  const formation_id = req.params.formation_id;
  console.log(`Request for formation by id with id #${formation_id}`);
  db.query(
    "SELECT * FROM formations WHERE formation_id = $1",
    [formation_id],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    }
  );
};

const getFormationByName = (req, res) => {
  const formation_name = req.params.formation_name;
  console.log(`Request for formation by name with name: ${formation_name}`);
  db.query(
    "SELECT * FROM formations WHERE formation = $1",
    [formation_name],
    (err, results) => {
      if (err) throw err;
      res.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAllFormations,
  getFormationById,
  getFormationByName,
};
