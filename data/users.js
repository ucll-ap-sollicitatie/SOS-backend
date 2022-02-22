// Contains all the queries for the table 'users'
const db = require("../configuration/db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { resolve } = require("path");
const saltRounds = 10;

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) ORDER BY r_u_number ASC",
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
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE email = $1",
      [email],
      (err, results) => {
        if (err || !results.rowCount) reject(err);
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
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE r_u_number = $1",
      [r_u_number],
      (err, results) => {
        if (err || !results.rowCount) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("User not found.");
        }
      }
    );
  });
};

const findOneByToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT r_u_number, name, surname, email, image, hashed_password, role, formation, activation_token, token_expiration_date FROM users INNER JOIN roles using(role_id) INNER JOIN formations using(formation_id) WHERE activation_token = $1",
      [token],
      (err, results) => {
        if (err || !results.rowCount) reject(err);
        if (results.rowCount == 1) {
          resolve(results.rows[0]);
        } else {
          reject("User not found.");
        }
      }
    );
  });
};

const add = (r_u_number, name, surname, email, password, role_id, formation_id) => {
  return new Promise((resolve, reject) => {
    findOneByEmail(email)
      .then(() => {
        reject("User already exists.");
      })
      .catch(() => {
        bcrypt.hash(password, saltRounds, (hash_err, hash) => {
          if (hash_err) reject(hash_err);
          const activation_token = crypto.randomBytes(48).toString("hex");
          db.query(
            "INSERT INTO users (r_u_number, name, surname, email, hashed_password, role_id, formation_id, activation_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [r_u_number, name, surname, email, hash, role_id, formation_id, activation_token],
            (err, results) => {
              if (err) reject("Add query error.");
              resolve({ message: "User added.", token: activation_token });
            }
          );
        });
      });
  });
};

const update = (email, r_u_number, name, surname) => {
  db.query(
    "UPDATE users SET r_u_number = $1, name = $2, surname = $3 WHERE email = $4 RETURNING email",
    [r_u_number, name, surname, email],
    (err, results) => {
      if (err || !results.rowCount) throw err;
      if (results.rowCount == 1) {
        resolve("User updated.");
      } else {
        reject(`User with email ${email} does not exist.`);
      }
    }
  );
};

const deleteOne = (r_u_number) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE r_u_number = $1 RETURNING r_u_number", [r_u_number], (err, results) => {
      if (err || !results.rowCount) reject(err);
      if (results.rowCount == 1) {
        resolve("User deleted.");
      } else {
        reject(`User with r_u_number ${r_u_number} does not exist.`);
      }
    });
  });
};

const activateUser = (token) => {
  return new Promise((resolve, reject) => {
    findOneByToken(token)
      .then(() => {
        db.query(
          "UPDATE users SET activation_token = null, token_expiration_date = null WHERE activation_token = $1 RETURNING email",
          [token],
          (err, results) => {
            if (err || !results.rowCount) reject(err);
            if (results.rowCount == 1) {
              resolve("User activated.");
            } else {
              reject(`User does not exist.`);
            }
          }
        );
      })
      .catch((err) => reject(err));
  });
};

const newToken = (current_user, activation_token) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET activation_token = $1, token_expiration_date = (now() + '01:00:00'::interval) WHERE email = $2 RETURNING email",
      [activation_token, current_user.email],
      (err, results) => {
        if (err || !results.rowCount) reject(err);
        if (results.rowCount == 1) {
          resolve("New token provided.");
        } else {
          reject(`New token failure.`);
        }
      }
    );
  });
};

const sendMail = (email, token) => {
  return new Promise((resolve, reject) => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "slimopsollicitatie2022@gmail.com",
      subject: "SOS - Account activation",
      html: `
        <h3>Welcome to Slim op sollicitatie!</h3>
        <p>Thank you for registering, please click the following link to activate your account.</p>
        <p><a target="_" href="http://localhost:3001/users/activation/${token}">Activate my account!</a></p>
        <p>This link expires after 5 hours. You may always resend a new activation mail.</p>`,
    };

    sgMail
      .send(msg)
      .then(() => resolve("Email sent."))
      .catch((e) => reject(e));
  });
};

module.exports = {
  findAll,
  findOneByEmail,
  findOneById,
  findOneByToken,
  add,
  update,
  deleteOne,
  activateUser,
  newToken,
  sendMail,
};
