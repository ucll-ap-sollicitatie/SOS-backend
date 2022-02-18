// Contains all the queries for the table 'users'
const db = require("../configuration/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) ORDER BY r_u_number ASC",
      (err, results) => {
        if (err) return reject(err);
        if (results.rowCount != 0) {
          resolve(results.rows);
        } else {
          reject("No users found.");
        }
      }
    );
  });
};

const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE email = $1",
      [email],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("User not found.");
        }
      }
    );
  });
};

const findOneById = (r_u_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE r_u_number = $1",
      [r_u_number],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("User not found.");
        }
      }
    );
  });
};

const add = (
  r_u_number,
  name,
  surname,
  email,
  password,
  role_id,
  formation_id
) => {
  return new Promise((resolve, reject) => {
    findOneByEmail(email)
      .then(() => {
        reject(`User already exists.`);
      })
      .catch(() => {
        bcrypt.hash(password, saltRounds, (hash_err, hash) => {
          if (hash_err) reject(hash_err);
          db.query(
            "INSERT INTO users (r_u_number, name, surname, email, hashed_password, role_id, formation_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [r_u_number, name, surname, email, hash, role_id, formation_id],
            (err, results) => {
              if (err) reject(`User already exists.`);
              resolve("User added.");
            }
          );
        });
      });
  });
};

// const update = (req, res) => {
//     const r_u_number = req.params.r_u_number
//     const {name, surname, email, formation} = req.body
//     console.log(`Request to update user with id ${r_u_number} and ${name}, ${surname}, ${email}, ${formation}`)
//     db.query('UPDATE users SET name = $1, surname = $2, email = $3, formation = $4 WHERE r_u_number = $5 RETURNING r_u_number', [name, surname, email, formation, r_u_number], (err, results) => {
//         if (err) throw err
//     })
// }

const deleteOne = (r_u_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM users WHERE r_u_number = $1 RETURNING r_u_number",
      [r_u_number],
      (err, results) => {
        if (err) reject(err);
        if (results.rowCount == 1) {
          resolve("User deleted.");
        } else {
          reject(`User #${r_u_number} does not exist.`);
        }
      }
    );
  });
};

module.exports = {
  findAll,
  findOneByEmail,
  findOneById,
  add,
  // update,
  deleteOne,
};
