// Contains all the queries for the table 'preferences'
const { db, queryHelpers } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM preferences ORDER BY preference_id ASC", (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM dev.preferences WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQueryOne(resolve, reject, err, results);
    });
  });
};

const add = (email) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO preferences (email) VALUES ($1)", [email], (err, results) => {
      queryHelpers.handleQueryAdd(resolve, reject, err, "Preferences");
    });
  });
};

const update = (email, preference_1, preference_2, preference_3) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE preferences SET preference_1 = $2, preference_2 = $3, preference_3 = $4, edited = true WHERE email = $1",
      [email, preference_1, preference_2, preference_3],
      (err, results) => {
        queryHelpers.handleQueryUpdate(resolve, reject, err, "Preferences");
      }
    );
  });
};

const deleteOne = (email) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM preferences WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Preferences");
    });
  });
};

const toggleIntroduction = (email) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE preferences SET introduced = NOT introduced WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQueryUpdate(resolve, reject, err, "Preferences");
    });
  });
};

module.exports = {
  findAll,
  findOneByEmail,
  add,
  update,
  deleteOne,
  toggleIntroduction,
};
